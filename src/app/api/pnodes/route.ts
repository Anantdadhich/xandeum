import { NextRequest, NextResponse } from "next/server";
import { pnodeClient } from "@/lib/pnode-client";
import type { PNodeInfo, PNodeStats } from "@/types/pnode";

export const dynamic = "force-dynamic";


export interface EnrichedPNodeInfo extends PNodeInfo {
  total_bytes?: number;
  total_pages?: number;
  uptime?: number;
  cpu_percent?: number;
  ram_used?: number;
  ram_total?: number;
  active_streams?: number;
  packets_received?: number;
  packets_sent?: number;
  file_size?: number;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit');
    const limitNum = limit ? parseInt(limit, 10) : undefined;

    const pnodes = await pnodeClient.getAllPNodes();

    // If limit is specified, return only that many nodes without enrichment for speed
    if (limitNum && limitNum > 0) {
      const limitedNodes = pnodes.slice(0, limitNum);
      return NextResponse.json({
        success: true,
        data: limitedNodes,
        total: pnodes.length,
        limited: true,
      });
    }

    // Full enrichment for first 20 nodes
    const enrichedPNodes: EnrichedPNodeInfo[] = await Promise.all(
      pnodes.slice(0, 20).map(async (pnode) => {
        try {
          const stats = await pnodeClient.getPNodeStats(pnode.address);

          if (stats) {
            return {
              ...pnode,
              total_bytes: stats.total_bytes,
              total_pages: stats.total_pages,
              uptime: stats.uptime,
              cpu_percent: stats.cpu_percent,
              ram_used: stats.ram_used,
              ram_total: stats.ram_total,
              active_streams: stats.active_streams,
              packets_received: stats.packets_received,
              packets_sent: stats.packets_sent,
              file_size: stats.file_size,
            };
          }
        } catch (error) {

        }

        return pnode;
      })
    );


    const remainingNodes = pnodes.slice(20);

    return NextResponse.json({
      success: true,
      data: [...enrichedPNodes, ...remainingNodes],
      total: pnodes.length,
    });
  } catch (error) {

    return NextResponse.json(
      { success: false, error: "Failed to fetch pNodes" },
      { status: 500 }
    );
  }
}

export const revalidate = 30; 