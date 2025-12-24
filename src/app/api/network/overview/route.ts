import { NextResponse } from "next/server";
import { pnodeClient } from "@/lib/pnode-client";
import { analyzeNetwork } from "@/lib/network-analytics";
import { PNodeStats } from "@/types/pnode";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pnodes = await pnodeClient.getAllPNodes();

    const statsPromises = pnodes.map(pnode => 
      pnodeClient.getPNodeStats(pnode.address).then(stats => ({ address: pnode.address, stats }))
    );
    const statsResults = await Promise.all(statsPromises);

    const pnodeStats = new Map<string, PNodeStats>();
    statsResults.forEach(result => {
      if (result.stats) {
        pnodeStats.set(result.address, result.stats);
      }
    });

    const analytics = analyzeNetwork(pnodes, pnodeStats);

    return NextResponse.json({
      success: true,
      data: {
        ...analytics,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {

    return NextResponse.json(
      { success: false, error: "Failed to analyze network" },
      { status: 500 }
    );
  }
}

export const revalidate = 30; 
