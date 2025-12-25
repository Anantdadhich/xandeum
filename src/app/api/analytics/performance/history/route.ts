import { NextResponse } from 'next/server'

export async function GET() {
    const history = []
    const now = new Date()

    // Generate 24 hours of history
    for (let i = 0; i < 24; i++) {
        const date = new Date(now)
        date.setHours(date.getHours() - (23 - i))

        history.push({
            timestamp: date.toISOString(),
            avg_cpu: Math.floor(40 + Math.random() * 30),
            avg_ram: Math.floor(50 + Math.random() * 20),
            network_latency: Math.floor(20 + Math.random() * 15)
        })
    }

    return NextResponse.json({
        success: true,
        data: history
    })
}
