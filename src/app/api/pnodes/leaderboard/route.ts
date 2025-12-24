import { NextResponse } from 'next/server'

// Generate mock leaderboard data
function generateLeaderboard() {
    const nodes = []

    for (let i = 0; i < 25; i++) {
        const pubkey = Array(44).fill(0).map(() =>
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
            Math.floor(Math.random() * 62)
            ]
        ).join('')

        nodes.push({
            rank: i + 1,
            pubkey,
            address: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}:${8001 + Math.floor(Math.random() * 100)}`,
            podCredits: Math.floor(10000 - (i * 300) + (Math.random() * 100)),
            uptime: 30 - (i * 0.5) + (Math.random() * 2),
            cpu: 20 + (Math.random() * 40),
            storage: 60 + (Math.random() * 35),
            status: i < 20 ? 'healthy' : (i < 23 ? 'degraded' : 'offline'),
        })
    }

    return nodes.sort((a, b) => b.podCredits - a.podCredits)
}

export async function GET() {
    const leaderboard = generateLeaderboard()

    return NextResponse.json({
        success: true,
        data: leaderboard,
        timestamp: Date.now(),
    })
}
