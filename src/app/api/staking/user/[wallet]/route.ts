import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { wallet: string } }) {
    const { wallet } = params

    // Mock logic: generate a deterministic balance based on wallet address chars
    const charCode = wallet.charCodeAt(0) || 0
    const stakedBalance = (charCode * 10) + 500

    return NextResponse.json({
        wallet,
        stakedAmount: stakedBalance,
        rewardsEarned: stakedBalance * 0.05,
        unlockingAmount: 0,
        lastStakeDate: new Date(Date.now() - 86400000 * 10).toISOString()
    })
}
