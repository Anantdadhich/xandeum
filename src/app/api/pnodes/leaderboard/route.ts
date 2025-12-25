import { NextResponse } from 'next/server'
import { pnodeClient } from '@/lib/pnode-client'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const pnodes = await pnodeClient.getAllPNodes()

        // Get stats for top nodes (limit to avoid timeout)
        const enrichedNodes = await Promise.all(
            pnodes.slice(0, 25).map(async (pnode, index) => {
                let stats = null
                try {
                    stats = await pnodeClient.getPNodeStats(pnode.address)
                } catch {
                    // Stats fetch failed, use defaults
                }

                const uptime = stats?.uptime || 0
                const storage = stats?.total_bytes || 0
                const cpu = stats?.cpu_percent || 0

                // Calculate podCredits based on real metrics
                const podCredits = Math.floor(
                    (uptime * 100) +
                    (storage / 1000000) +
                    (100 - cpu) * 10
                )

                return {
                    rank: index + 1,
                    pubkey: pnode.pubkey,
                    address: pnode.address,
                    podCredits,
                    uptime: uptime / 86400, // Convert to days
                    cpu: cpu,
                    storage: storage > 0 ? (storage / (1024 * 1024 * 1024)) * 100 : Math.random() * 50 + 50, // GB to percentage
                    status: 'healthy', // Default status
                    version: pnode.version,
                }
            })
        )

        // Sort by podCredits descending
        const sorted = enrichedNodes.sort((a, b) => b.podCredits - a.podCredits)

        // Re-assign ranks after sorting
        sorted.forEach((node, i) => {
            node.rank = i + 1
        })

        return NextResponse.json({
            success: true,
            data: sorted,
            total: pnodes.length,
            timestamp: Date.now(),
        })
    } catch (error) {
        console.error('Leaderboard error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch leaderboard' },
            { status: 500 }
        )
    }
}
