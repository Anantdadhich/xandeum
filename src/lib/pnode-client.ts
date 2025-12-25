import { PNodeInfo, PNodeStats, PNodeListResponse } from "@/types/pnode";
import http from "http";
import fs from "fs";
import path from "path";
import os from "os";

const SEED_PNODES = [
  "173.212.203.145",
  "173.212.220.65",
  "161.97.97.41",
  "192.190.136.36",
  "192.190.136.37",
  "192.190.136.38",
  "192.190.136.28",
  "192.190.136.29",
  "207.244.255.1",
];

interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  id: number;
}

interface JsonRpcResponse<T> {
  jsonrpc: string;
  result: T;
  error: any;
  id: number;
}


interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class PNodeClient {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private ttl = 60000; // 60 seconds - increased for stability
  private cachePath: string;

  private basePort = 6000;

  constructor() {
    this.cachePath = path.join(os.tmpdir(), "pnode-cache.json");
    this.loadCache();
  }

  private loadCache() {
    try {
      if (fs.existsSync(this.cachePath)) {
        const fileContent = fs.readFileSync(this.cachePath, "utf-8");
        const parsedCache = JSON.parse(fileContent);
        if (parsedCache && typeof parsedCache === 'object' && !Array.isArray(parsedCache)) {
          for (const [key, value] of Object.entries(parsedCache)) {
            this.cache.set(key, value as CacheEntry<any>);
          }
        }
        console.log("Loaded pNode cache from", this.cachePath);
      }
    } catch (error) {
      console.error("Error loading pNode cache:", error);
      this.cache = new Map();
    }
  }

  private saveCache() {
    try {
      const cacheObject = Object.fromEntries(this.cache);
      fs.writeFileSync(this.cachePath, JSON.stringify(cacheObject, null, 2));
    } catch (error) {
      console.error("Error saving pNode cache:", error);
    }
  }

  private async callRpcWithPortFallbacks<T>(
    ip: string,
    method: string,
    gossipPort: number
  ): Promise<T | null> {
    const cacheKey = `${method}:${ip}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.data;
    }

    const portsToTry = [
      gossipPort ? gossipPort + 1 : 6001, // Default to 6001 if gossip port is unknown
      6000, // Default RPC port
      gossipPort, // Sometimes RPC is on the same port as gossip
    ];

    for (const port of [...new Set(portsToTry)].filter(p => p > 0)) { // Iterate over unique, valid ports
      const result = await this._callRpc<T>(ip, method, port);
      if (result) {
        this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
        this.saveCache();
        return result;
      }
    }

    return null;
  }

  private async _callRpc<T>(
    ip: string,
    method: string,
    port: number
  ): Promise<T | null> {

    const payload: JsonRpcRequest = {
      jsonrpc: "2.0",
      method,
      id: 1,
    };

    return new Promise((resolve) => {
      const postData = JSON.stringify(payload);

      const options = {
        hostname: ip,
        port: port,
        path: "/rpc",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
        timeout: 1000, // Fast fail for unresponsive nodes
      };

      const req = http.request(options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const response: JsonRpcResponse<T> = JSON.parse(data);

            if (response.error) {
              resolve(null);
              return;
            }

            resolve(response.result);
          } catch {
            resolve(null);
          }
        });
      });

      req.on("error", () => {
        resolve(null);
      });

      req.on("timeout", () => {
        req.destroy();
        resolve(null);
      });

      req.write(postData);
      req.end();
    });
  }

  async getAllPNodes(): Promise<PNodeInfo[]> {
    const results = await Promise.all(
      SEED_PNODES.map(async (seedIp) => {
        const result = await this._callRpc<PNodeListResponse>(
          seedIp,
          "get-pods",
          6000
        );

        if (result && result.pods) {
          return result.pods;
        }

        return [];
      })
    );

    const allPNodes = results.flat();
    const uniquePNodes = new Map<string, PNodeInfo>();

    allPNodes.forEach((pnode) => {
      const existing = uniquePNodes.get(pnode.address);
      if (
        !existing ||
        pnode.last_seen_timestamp > existing.last_seen_timestamp
      ) {
        uniquePNodes.set(pnode.address, pnode);
      }
    });

    return Array.from(uniquePNodes.values());
  }

  async getPNodeStats(address: string): Promise<PNodeStats | null> {
    const [ip, gossipPortStr] = address.split(":");
    const gossipPort = parseInt(gossipPortStr, 10) || 0;
    return this.callRpcWithPortFallbacks<PNodeStats>(ip, "get-stats", gossipPort);
  }

  async getPNodeVersion(address: string): Promise<string | null> {
    const [ip, gossipPortStr] = address.split(":");
    const gossipPort = parseInt(gossipPortStr, 10) || 0;
    const result = await this.callRpcWithPortFallbacks<{ version: string }>(
      ip,
      "get-version",
      gossipPort
    );
    return result?.version || null;
  }
}

export const pnodeClient = new PNodeClient();
