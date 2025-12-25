'use client'

import { useState, useEffect } from 'react'
import {
    Coins,
    ArrowRight,
    TrendingUp,
    Clock,
    Shield,
    Wallet
} from 'lucide-react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

interface StakingInfo {
    apy: number
    exchangeRate: number
    totalStaked: number
    validators: number
    epoch: number
    nextEpochIn: string
    minStake: number
    unstakePeriod: string
}

const mockStakingInfo: StakingInfo = {
    apy: 7.20,
    exchangeRate: 1.072,
    totalStaked: 15420000,
    validators: 42,
    epoch: 523,
    nextEpochIn: '4h 23m',
    minStake: 0.01,
    unstakePeriod: '2-3 days'
}

export default function StakePage() {
    const { connection } = useConnection()
    const { publicKey, connected } = useWallet()
    const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
    const [amount, setAmount] = useState<string>('')
    const [stakingInfo] = useState<StakingInfo>(mockStakingInfo)
    const [balance, setBalance] = useState<number>(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey).then((lamports) => {
                setBalance(lamports / LAMPORTS_PER_SOL)
            })
        } else {
            setBalance(0)
        }
    }, [publicKey, connection])

    const solBalance = balance
    const xandsolBalance = 0 // Mock balance for now as we don't have token account fetch yet

    const outputAmount = activeTab === 'stake'
        ? amount ? (parseFloat(amount) / stakingInfo.exchangeRate).toFixed(6) : ''
        : amount ? (parseFloat(amount) * stakingInfo.exchangeRate).toFixed(6) : ''

    const handleAction = async () => {
        if (!connected) return

        setIsSubmitting(true)
        // Mock API call for staking/unstaking
        // Real implementation would build a transaction
        setTimeout(() => {
            setIsSubmitting(false)
            setAmount('')
        }, 1500)
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-main max-w-lg mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-white">Liquid Staking</h1>
                    <p className="text-[var(--foreground-muted)] max-w-md mx-auto">
                        Stake SOL to receive XANDsol and earn {stakingInfo.apy}% APY while maintaining liquidity.
                    </p>
                </div>

                {/* Staking Card */}
                <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] pointer-events-none" />

                    {/* Tabs */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--background)] rounded-xl">
                        {(['stake', 'unstake'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab
                                    ? 'bg-[var(--card)] text-white shadow-lg'
                                    : 'text-[var(--foreground-muted)] hover:text-white'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <label className="text-[var(--foreground-muted)]">
                                    {activeTab === 'stake' ? 'You stake' : 'You unstake'}
                                </label>
                                <span className="text-sm text-[var(--foreground-muted)]">
                                    Balance: {activeTab === 'stake' ? solBalance.toFixed(4) : xandsolBalance.toFixed(4)} {activeTab === 'stake' ? 'SOL' : 'XANDsol'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background)]">
                                <div className="flex items-center gap-2">
                                    {activeTab === 'stake' ? (
                                        <div className="w-8 h-8 rounded-full bg-[#14F195] flex items-center justify-center text-black font-bold text-xs">SOL</div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-bold text-xs">XAND</div>
                                    )}
                                    <span className="font-bold text-white">
                                        {activeTab === 'stake' ? 'SOL' : 'XANDsol'}
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="flex-1 bg-transparent text-right text-2xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                                />
                            </div>

                            {/* Percentages */}
                            <div className="flex justify-end gap-2">
                                {[25, 50, 75, 100].map((percent) => (
                                    <button
                                        key={percent}
                                        onClick={() => {
                                            const currentBalance = activeTab === 'stake' ? solBalance : xandsolBalance
                                            setAmount(((currentBalance * percent) / 100).toString())
                                        }}
                                        className="px-2 py-1 rounded text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors"
                                    >
                                        {percent}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center text-[var(--foreground-muted)]">
                            <ArrowRight className="w-6 h-6 rotate-90" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-[var(--foreground-muted)]">
                                {activeTab === 'stake' ? 'You receive' : 'You receive'}
                            </label>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background)]">
                                <div className="flex items-center gap-2">
                                    {activeTab === 'stake' ? (
                                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-black font-bold text-xs">XAND</div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-[#14F195] flex items-center justify-center text-black font-bold text-xs">SOL</div>
                                    )}
                                    <span className="font-bold text-white">
                                        {activeTab === 'stake' ? 'XANDsol' : 'SOL'}
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    value={outputAmount}
                                    readOnly
                                    className="flex-1 bg-transparent text-right text-2xl font-bold text-[var(--foreground-muted)] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Simualtion Result */}
                    {amount && parseFloat(amount) > 0 && (
                        <div className="p-4 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent)]/20 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-[var(--foreground-muted)]">Rate</span>
                                <span className="text-white font-medium">1 XANDsol = {stakingInfo.exchangeRate} SOL</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--foreground-muted)]">Transaction Cost</span>
                                <span className="text-white font-medium">~0.000005 SOL</span>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {connected ? (
                        <button
                            onClick={handleAction}
                            disabled={!amount || parseFloat(amount) <= 0 || isSubmitting}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Wallet className="w-5 h-5" />
                            {isSubmitting ? 'Processing...' : (activeTab === 'stake' ? 'Stake' : 'Unstake')}
                        </button>
                    ) : (
                        <div className="flex justify-center">
                            <WalletMultiButton className="!w-full !justify-center !bg-[var(--accent)] !text-black hover:!bg-[var(--accent)]/90 !transition-colors !rounded-xl !h-14 !text-lg !font-bold" />
                        </div>
                    )}

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-card p-4 text-center">
                        <TrendingUp className="w-6 h-6 text-[#14F195] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stakingInfo.apy}%</div>
                        <div className="text-xs text-[var(--foreground-muted)]">APY</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Coins className="w-6 h-6 text-[var(--accent)] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">15.4M</div>
                        <div className="text-xs text-[var(--foreground-muted)]">TVL (SOL)</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Clock className="w-6 h-6 text-[#A855F7] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">~4h</div>
                        <div className="text-xs text-[var(--foreground-muted)]">Next Epoch</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <Shield className="w-6 h-6 text-[#3B82F6] mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{stakingInfo.validators}</div>
                        <div className="text-xs text-[var(--foreground-muted)]">Validators</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
