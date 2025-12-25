import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { wallet, amount } = body

        if (!wallet || !amount) {
            return NextResponse.json({ error: 'Missing wallet or amount' }, { status: 400 })
        }

        // Mock transaction success
        return NextResponse.json({
            success: true,
            message: `Successfully unstaked ${amount} XAND`,
            txId: '5x' + Math.random().toString(36).substring(7)
        })

    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
}
