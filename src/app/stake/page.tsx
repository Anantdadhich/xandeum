'use client'

import { useState } from 'react'
import {
    Coins,
    ArrowRight,
    TrendingUp,
    Shield,
    Clock,
    Wallet,
    AlertCircle,
    Check
} from 'lucide-react'

interface StakingInfo {
    apy: number
    exchangeRate: number
    totalStaked: number
    validators: number
    yourStaked: number
    rewards: number
}

const mockStakingInfo: StakingInfo = {
    apy: 7.20,
    exchangeRate: 1.072,
    totalStaked: 15000000,
    validators: 42,
    yourStaked: 0,
    rewards: 0,
}

export default function StakePage() {
    const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
    const [amount, setAmount] = useState<string>('')
    const [stakingInfo] = useState<StakingInfo>(mockStakingInfo)

    const solBalance = 10.5 // Mock balance
    const xandsolBalance = 0 // Mock balance

    const outputAmount = activeTab === 'stake'
        ? amount ? (parseFloat(amount) / stakingInfo.exchangeRate).toFixed(6) : ''
        : amount ? (parseFloat(amount) * stakingInfo.exchangeRate).toFixed(6) : ''

    const formatNumber = (num: number) => {
        if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
        if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
        return num.toFixed(2)
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-main space-y-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-emerald-500 flex items-center justify-center mx-auto mb-4">
                        <Coins className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Liquid Staking
                    </h1>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        Stake your SOL and receive XANDsol. Earn staking rewards while keeping your assets liquid.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    <div className="glass-card p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-[var(--foreground-muted)] mb-2">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs uppercase">APY</span>
                        </div>
                        <p className="text-2xl font-bold text-[var(--accent)]">{stakingInfo.apy}%</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-[var(--foreground-muted)] mb-2">
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-xs uppercase">Exchange Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-white">1:{stakingInfo.exchangeRate}</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-[var(--foreground-muted)] mb-2">
                            <Shield className="w-4 h-4" />
                            <span className="text-xs uppercase">Total Staked</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{formatNumber(stakingInfo.totalStaked)} SOL</p>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-[var(--foreground-muted)] mb-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs uppercase">Validators</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stakingInfo.validators}</p>
                    </div>
                </div>

                {/* Staking Card */}
                <div className="max-w-lg mx-auto">
                    <div className="glass-card overflow-hidden">
                        {/* Tab Selector */}
                        <div className="flex border-b border-[var(--card-border)]">
                            <button
                                onClick={() => setActiveTab('stake')}
                                className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'stake'
                                    ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                                    : 'text-[var(--foreground-muted)] hover:text-white'
                                    }`}
                            >
                                Stake
                            </button>
                            <button
                                onClick={() => setActiveTab('unstake')}
                                className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'unstake'
                                    ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                                    : 'text-[var(--foreground-muted)] hover:text-white'
                                    }`}
                            >
                                Unstake
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm text-[var(--foreground-muted)]">
                                        {activeTab === 'stake' ? 'You stake' : 'You unstake'}
                                    </label>
                                    <span className="text-sm text-[var(--foreground-muted)]">
                                        Balance: {activeTab === 'stake' ? solBalance : xandsolBalance} {activeTab === 'stake' ? 'SOL' : 'XANDsol'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background)]">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="flex-1 bg-transparent text-2xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                                    />
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)]">
                                        <span className="text-xl">◎</span>
                                        <span className="font-semibold text-white">
                                            {activeTab === 'stake' ? 'SOL' : 'XANDsol'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    {[25, 50, 75, 100].map((percent) => (
                                        <button
                                            key={percent}
                                            onClick={() => {
                                                const balance = activeTab === 'stake' ? solBalance : xandsolBalance
                                                setAmount(((balance * percent) / 100).toString())
                                            }}
                                            className="px-2 py-1 rounded text-xs font-medium text-[var(--foreground-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors"
                                        >
                                            {percent}%
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center">
                                <div className="p-2 rounded-full bg-[var(--background)]">
                                    <ArrowRight className="w-5 h-5 text-[var(--foreground-muted)] rotate-90" />
                                </div>
                            </div>

                            {/* Output */}
                            <div className="space-y-2">
                                <label className="text-sm text-[var(--foreground-muted)]">
                                    {activeTab === 'stake' ? 'You receive' : 'You receive'}
                                </label>
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background)]">
                                    <input
                                        type="text"
                                        value={outputAmount}
                                        readOnly
                                        placeholder="0.00"
                                        className="flex-1 bg-transparent text-2xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                                    />
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)]">
                                        <span className="text-xl">✦</span>
                                        <span className="font-semibold text-white">
                                            {activeTab === 'stake' ? 'XANDsol' : 'SOL'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            {amount && (
                                <div className="space-y-2 p-4 rounded-xl bg-[var(--background)]">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--foreground-muted)]">Exchange Rate</span>
                                        <span className="text-white">
                                            1 SOL = {(1 / stakingInfo.exchangeRate).toFixed(6)} XANDsol
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[var(--foreground-muted)]">Estimated APY</span>
                                        <span className="text-[var(--accent)]">{stakingInfo.apy}%</span>
                                    </div>
                                    {activeTab === 'unstake' && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[var(--foreground-muted)]">Unstaking Period</span>
                                            <span className="text-white">~2-3 days</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Action Button */}
                            <button
                                disabled={!amount || parseFloat(amount) <= 0}
                                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Wallet className="w-5 h-5" />
                                Connect Wallet to {activeTab === 'stake' ? 'Stake' : 'Unstake'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">
                        Why Stake with Xandeum?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-6 h-6 text-[var(--accent)]" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Earn Rewards</h3>
                            <p className="text-sm text-[var(--foreground-muted)]">
                                Earn up to {stakingInfo.apy}% APY on your staked SOL
                            </p>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                                <Coins className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Stay Liquid</h3>
                            <p className="text-sm text-[var(--foreground-muted)]">
                                Use XANDsol across DeFi while earning staking rewards
                            </p>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
                            <p className="text-sm text-[var(--foreground-muted)]">
                                Delegated to {stakingInfo.validators}+ trusted validators
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demo Notice */}
                <div className="max-w-lg mx-auto flex items-start gap-3 p-4 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent)]/30">
                    <AlertCircle className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                    <div className="text-sm text-[var(--foreground-muted)]">
                        <p className="font-medium text-white mb-1">Demo Mode</p>
                        <p>
                            This is a demonstration interface. Connect the staking contract for real functionality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
