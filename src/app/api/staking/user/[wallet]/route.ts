import { NextResponse } from 'next/server'

export async function GET(request: Request, context: { params: Promise<{ wallet: string }> }) {
    const { wallet } = await context.params


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
