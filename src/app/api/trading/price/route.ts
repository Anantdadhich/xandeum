import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'XAND'

    try {
        if (symbol === 'SOL') {
            // Fetch real SOL price from CoinGecko
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true')
            const data = await res.json()
            if (data.solana) {
                return NextResponse.json({
                    price: data.solana.usd,
                    change24h: data.solana.usd_24h_change,
                    timestamp: new Date().toISOString()
                })
            }
        }

        // Default / Mock for XAND (since it's not live yet or easy to fetch)
        const basePrice = 0.002326
        const variation = (Math.random() * 0.0001) - 0.00005
        const price = basePrice + variation

        return NextResponse.json({
            price: Number(price.toFixed(6)),
            change24h: -1.45 + (Math.random() * 0.1),
            timestamp: new Date().toISOString()
        })
    } catch (e) {
        console.error('Price fetch error', e)
        // Fallback
        return NextResponse.json({
            price: symbol === 'SOL' ? 98.45 : 0.00234,
            change24h: 0,
            timestamp: new Date().toISOString()
        })
    }
}
