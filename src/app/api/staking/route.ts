import { NextResponse } from 'next/server'

// Mock staking data
const stakingData = {
    apy: 7.20,
    exchangeRate: 1.072,
    totalStaked: 15000000,
    validators: 42,
    epoch: 523,
    nextEpochIn: '4h 23m',
    minStake: 0.01,
    unstakePeriod: '2-3 days',
}

export async function GET() {
    return NextResponse.json({
        success: true,
        data: stakingData,
        timestamp: Date.now(),
    })
}
