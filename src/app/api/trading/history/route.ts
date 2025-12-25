import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const interval = searchParams.get('interval') || '1h'
    const limit = parseInt(searchParams.get('limit') || '24')

    const history = []
    const now = new Date()
    let currentPrice = 0.002326

    // Generate mock candles
    for (let i = limit; i >= 0; i--) {
        const time = new Date(now)
        if (interval === '1h') {
            time.setHours(time.getHours() - i)
        } else {
            time.setDate(time.getDate() - i)
        }

        const open = currentPrice
        const close = open * (1 + (Math.random() * 0.04 - 0.02))
        const high = Math.max(open, close) * (1 + Math.random() * 0.01)
        const low = Math.min(open, close) * (1 - Math.random() * 0.01)
        const volume = Math.floor(Math.random() * 100000)

        history.push({
            time: time.toISOString(),
            open: Number(open.toFixed(6)),
            high: Number(high.toFixed(6)),
            low: Number(low.toFixed(6)),
            close: Number(close.toFixed(6)),
            volume
        })

        currentPrice = close
    }

    return NextResponse.json({
        success: true,
        data: history
    })
}
