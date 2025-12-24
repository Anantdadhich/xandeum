import { PNodeInfo, PNodeStats, PNodeListResponse } from "@/types/pnode";
import http from "http";

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

export class PNodeClient {
  private basePort = 6000;

  private async callRpc<T>(ip: string, method: string): Promise<T | null> {
    const payload: JsonRpcRequest = {
      jsonrpc: "2.0",
      method,
      id: 1,
    };

    return new Promise((resolve) => {
      const postData = JSON.stringify(payload);

      const options = {
        hostname: ip,
        port: this.basePort,
        path: "/rpc",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
        timeout: 10000,
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
        const result = await this.callRpc<PNodeListResponse>(
          seedIp,
          "get-pods"
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
    const ip = address.split(":")[0];
    return this.callRpc<PNodeStats>(ip, "get-stats");
  }

  async getPNodeVersion(address: string): Promise<string | null> {
    const ip = address.split(":")[0];
    const result = await this.callRpc<{ version: string }>(ip, "get-version");
    return result?.version || null;
  }
}

export const pnodeClient = new PNodeClient();
