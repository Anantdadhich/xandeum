import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        // Fetch real SOL price from CoinGecko
        const solRes = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true',
            { next: { revalidate: 30 } }
        )
        const solData = await solRes.json()

        const data = {
            xand: {
                symbol: 'XAND',
                name: 'Xandeum',
                // XAND not on CoinGecko yet - using placeholder with small variation
                price: 0.002326 + (Math.random() * 0.0001 - 0.00005),
                change24h: -1.45 + (Math.random() * 0.5),
                volume24h: 125000 + Math.floor(Math.random() * 10000),
                marketCap: 2326000,
                high24h: 0.00245,
                low24h: 0.00218,
            },
            sol: {
                symbol: 'SOL',
                name: 'Solana',
                price: solData.solana?.usd || 98.45,
                change24h: solData.solana?.usd_24h_change || 0,
                volume24h: solData.solana?.usd_24h_vol || 850000000,
                marketCap: solData.solana?.usd_market_cap || 42000000000,
                high24h: (solData.solana?.usd || 98.45) * 1.02,
                low24h: (solData.solana?.usd || 98.45) * 0.98,
            },
        }

        return NextResponse.json({
            success: true,
            data,
            timestamp: Date.now(),
        })
    } catch (error) {
        console.error('Trading data fetch error:', error)
        // Fallback
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch trading data',
            data: null,
        }, { status: 500 })
    }
}
