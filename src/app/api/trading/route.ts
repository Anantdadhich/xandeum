import { NextResponse } from 'next/server'

// Mock trading data
const tradingData = {
    xand: {
        symbol: 'XAND',
        name: 'Xandeum',
        price: 0.0234,
        change24h: 5.23,
        volume24h: 1250000,
        marketCap: 23400000,
        high24h: 0.0245,
        low24h: 0.0218,
    },
    sol: {
        symbol: 'SOL',
        name: 'Solana',
        price: 98.45,
        change24h: -1.82,
        volume24h: 850000000,
        marketCap: 42000000000,
        high24h: 102.30,
        low24h: 96.15,
    },
}

export async function GET() {
    // Add slight random variations to simulate live data
    const data = {
        xand: {
            ...tradingData.xand,
            price: tradingData.xand.price * (1 + (Math.random() - 0.5) * 0.02),
            change24h: tradingData.xand.change24h + (Math.random() - 0.5) * 0.5,
        },
        sol: {
            ...tradingData.sol,
            price: tradingData.sol.price * (1 + (Math.random() - 0.5) * 0.01),
            change24h: tradingData.sol.change24h + (Math.random() - 0.5) * 0.3,
        },
    }

    return NextResponse.json({
        success: true,
        data,
        timestamp: Date.now(),
    })
}
