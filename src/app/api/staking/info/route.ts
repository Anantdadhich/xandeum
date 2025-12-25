import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({
        apy: 12.5,
        tvl: 15000000,
        minStake: 100,
        lockPeriod: 7, // days
        totalStakers: 1250,
        epoch: 452,
        nextEpochTime: new Date(Date.now() + 3600000 * 4).toISOString() // 4 hours from now
    })
}
