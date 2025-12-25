import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '24h'

    // Generate mock health history
    const data = []
    const now = new Date()
    const points = range === '24h' ? 24 : 7

    for (let i = points; i >= 0; i--) {
        const time = new Date(now)
        if (range === '24h') {
            time.setHours(time.getHours() - i)
        } else {
            time.setDate(time.getDate() - i)
        }

        // Generate a high score with occasional dips
        let score = 90 + Math.random() * 10
        if (Math.random() > 0.8) score -= Math.random() * 15 // Random dip

        data.push({
            timestamp: time.toISOString(),
            score: Math.floor(score)
        })
    }

    return NextResponse.json({
        data
    })
}
