import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        volume24h: 1250000,
        marketCap: 23400000,
        fdv: 94500000, // Fixed Fully Diluted Valuation (usually higher than Market Cap)
        liquidity: 82630,
        high24h: 0.00245,
        low24h: 0.00218,
        timestamp: new Date().toISOString()
    })
}
