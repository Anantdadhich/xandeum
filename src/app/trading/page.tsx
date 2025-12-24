'use client'

import { useState, useEffect } from 'react'
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    BarChart2,
    ExternalLink,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'

interface TokenPrice {
    symbol: string
    name: string
    price: number
    change24h: number
    volume24h: number
    marketCap: number
    high24h: number
    low24h: number
}

// Mock data for trading terminal
const mockPrices: TokenPrice[] = [
    {
        symbol: 'XAND',
        name: 'Xandeum',
        price: 0.0234,
        change24h: 5.23,
        volume24h: 1250000,
        marketCap: 23400000,
        high24h: 0.0245,
        low24h: 0.0218,
    },
    {
        symbol: 'SOL',
        name: 'Solana',
        price: 98.45,
        change24h: -1.82,
        volume24h: 850000000,
        marketCap: 42000000000,
        high24h: 102.30,
        low24h: 96.15,
    },
]

export default function TradingPage() {
    const [prices, setPrices] = useState<TokenPrice[]>(mockPrices)
    const [isLoading, setIsLoading] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

    const refreshPrices = () => {
        setIsLoading(true)
        // Simulate API call with slight price variations
        setTimeout(() => {
            setPrices(prev => prev.map(token => ({
                ...token,
                price: token.price * (1 + (Math.random() - 0.5) * 0.02),
                change24h: token.change24h + (Math.random() - 0.5) * 0.5,
            })))
            setLastUpdated(new Date())
            setIsLoading(false)
        }, 500)
    }

    useEffect(() => {
        const interval = setInterval(refreshPrices, 30000)
        return () => clearInterval(interval)
    }, [])

    const formatCurrency = (value: number, decimals: number = 2) => {
        if (value >= 1e9) return `$${(value / 1e9).toFixed(decimals)}B`
        if (value >= 1e6) return `$${(value / 1e6).toFixed(decimals)}M`
        if (value >= 1e3) return `$${(value / 1e3).toFixed(decimals)}K`
        return `$${value.toFixed(decimals)}`
    }

    const xandPrice = prices.find(p => p.symbol === 'XAND')
    const solPrice = prices.find(p => p.symbol === 'SOL')
    const exchangeRate = xandPrice && solPrice ? xandPrice.price / solPrice.price : 0

    return (
        <div className="min-h-screen py-12">
            <div className="container-main space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-[var(--accent)]" />
                            </div>
                            Trading Terminal
                        </h1>
                        <p className="text-[var(--foreground-muted)] mt-2">
                            Real-time price data for XAND and SOL
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-[var(--foreground-muted)]">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                        <button
                            onClick={refreshPrices}
                            disabled={isLoading}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Price Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {prices.map((token) => (
                        <div key={token.symbol} className="glass-card p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${token.symbol === 'XAND'
                                            ? 'bg-[var(--accent-subtle)]'
                                            : 'bg-purple-500/20'
                                        }`}>
                                        <span className={`text-lg font-bold ${token.symbol === 'XAND'
                                                ? 'text-[var(--accent)]'
                                                : 'text-purple-400'
                                            }`}>
                                            {token.symbol.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{token.name}</h3>
                                        <p className="text-sm text-[var(--foreground-muted)]">{token.symbol}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${token.change24h >= 0
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {token.change24h >= 0 ? (
                                        <ArrowUpRight className="w-4 h-4" />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4" />
                                    )}
                                    {Math.abs(token.change24h).toFixed(2)}%
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-4xl font-bold text-white">
                                    ${token.price < 1 ? token.price.toFixed(4) : token.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-[var(--background)]">
                                    <p className="text-xs text-[var(--foreground-muted)]">24h Volume</p>
                                    <p className="text-lg font-semibold text-white mt-1">
                                        {formatCurrency(token.volume24h)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-[var(--background)]">
                                    <p className="text-xs text-[var(--foreground-muted)]">Market Cap</p>
                                    <p className="text-lg font-semibold text-white mt-1">
                                        {formatCurrency(token.marketCap)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-[var(--background)]">
                                    <p className="text-xs text-[var(--foreground-muted)]">24h High</p>
                                    <p className="text-lg font-semibold text-green-400 mt-1">
                                        ${token.high24h < 1 ? token.high24h.toFixed(4) : token.high24h.toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-[var(--background)]">
                                    <p className="text-xs text-[var(--foreground-muted)]">24h Low</p>
                                    <p className="text-lg font-semibold text-red-400 mt-1">
                                        ${token.low24h < 1 ? token.low24h.toFixed(4) : token.low24h.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Exchange Rate Widget */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[var(--accent)]" />
                        Exchange Rate
                    </h3>
                    <div className="flex items-center justify-center gap-4 py-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">1 XAND</p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">Xandeum</p>
                        </div>
                        <div className="text-2xl text-[var(--foreground-muted)]">=</div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-[var(--accent)]">
                                {exchangeRate.toFixed(8)} SOL
                            </p>
                            <p className="text-sm text-[var(--foreground-muted)] mt-1">Solana</p>
                        </div>
                    </div>
                </div>

                {/* External Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="https://birdeye.so"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5 text-[var(--accent)]" />
                            <span className="font-medium text-white">Birdeye Charts</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                    </a>
                    <a
                        href="https://dexscreener.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <span className="font-medium text-white">DexScreener</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                    </a>
                    <a
                        href="https://jup.ag"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-orange-400" />
                            <span className="font-medium text-white">Jupiter</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                    </a>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-sm text-[var(--foreground-muted)] py-4">
                    <p>Price data is for demonstration purposes. Connect to live APIs for real-time prices.</p>
                </div>
            </div>
        </div>
    )
}
