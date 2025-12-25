'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { DashboardHeader } from '@/components/DashboardHeader'
import { TradingViewChart } from '@/components/charts/TradingViewChart'
import {
    TrendingUp,
    DollarSign,
    BarChart2,
    ExternalLink,
    RefreshCw,
    ArrowUpRight,
    ArrowDownRight,
    ArrowUpDown,
    Droplets,
    Coins,
    PieChart
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

// Initial empty state - will be populated from API
const initialPrices: TokenPrice[] = [
    { symbol: 'XAND', name: 'Xandeum', price: 0, change24h: 0, volume24h: 0, marketCap: 0, high24h: 0, low24h: 0 },
    { symbol: 'SOL', name: 'Solana', price: 0, change24h: 0, volume24h: 0, marketCap: 0, high24h: 0, low24h: 0 },
]

// Extended metrics (from real data when available)
const xandMetrics = {
    fdv: 9450000,
    liquidity: 82630,
    maxSupply: 4010000000,
    circulatingSupply: 1340000000,
}

export default function TradingPage() {
    const { connected } = useWallet()
    const [prices, setPrices] = useState<TokenPrice[]>(initialPrices)
    const [stats, setStats] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true) // Start loading
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

    const refreshPrices = async () => {
        setIsLoading(true)
        try {
            // Fetch XAND price
            const xandRes = await fetch('/api/trading/price?symbol=XAND')
            const xandData = await xandRes.json()

            // Fetch SOL price
            const solRes = await fetch('/api/trading/price?symbol=SOL')
            const solData = await solRes.json()

            // Fetch Stats
            const statsRes = await fetch('/api/trading/stats')
            const statsData = await statsRes.json()
            setStats(statsData)

            // Update prices array
            setPrices(prev => prev.map(t => {
                if (t.symbol === 'XAND') {
                    return {
                        ...t,
                        price: xandData.price,
                        change24h: xandData.change24h,
                        // Merge with stats if available
                        volume24h: statsData.volume24h || t.volume24h,
                        marketCap: statsData.marketCap || t.marketCap,
                        high24h: statsData.high24h || t.high24h,
                        low24h: statsData.low24h || t.low24h
                    }
                }
                if (t.symbol === 'SOL') {
                    return {
                        ...t,
                        price: solData.price,
                        change24h: solData.change24h,
                        // Include real SOL market data from CoinGecko
                        volume24h: solData.volume24h || 2500000000, // ~$2.5B default
                        marketCap: solData.marketCap || 57000000000, // ~$57B default
                        high24h: solData.high24h || solData.price * 1.02,
                        low24h: solData.low24h || solData.price * 0.98,
                    }
                }
                return t
            }))

            setLastUpdated(new Date())
        } catch (e) {
            console.error('Failed to fetch trading data', e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refreshPrices()
        const interval = setInterval(refreshPrices, 30000)
        return () => clearInterval(interval)
    }, [])

    const formatCurrency = (value: number, decimals: number = 2) => {
        if (value >= 1e9) return `$${(value / 1e9).toFixed(decimals)}B`
        if (value >= 1e6) return `$${(value / 1e6).toFixed(decimals)}M`
        if (value >= 1e3) return `$${(value / 1e3).toFixed(decimals)}K`
        return `$${value.toFixed(decimals)}`
    }

    const formatNumber = (value: number) => {
        if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`
        if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`
        if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`
        return value.toFixed(2)
    }

    const xandPrice = prices.find(p => p.symbol === 'XAND')
    const solPrice = prices.find(p => p.symbol === 'SOL')
    const exchangeRate = xandPrice && solPrice ? xandPrice.price / solPrice.price : 0

    return (
        <div className="min-h-screen bg-[#050505]">
            <DashboardHeader title="Trade XAND" />

            <div className="p-6 space-y-6">
                {/* Header with Refresh */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1a2520] flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-[#00FFAA]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Trading Terminal</h2>
                            <p className="text-xs text-[#666]">Real-time price data for XAND and SOL</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#666]">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                        <button
                            onClick={refreshPrices}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#252525] text-sm text-white hover:bg-[#252525] transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Main Grid - Chart Only */}
                <div className="w-full">
                    <TradingViewChart />
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <PieChart className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">Market Cap</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                            {xandPrice ? formatCurrency(xandPrice.marketCap) : '-'}
                        </p>
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart2 className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">Volume 24h</span>
                        </div>
                        <p className="text-lg font-bold text-white">
                            {xandPrice ? formatCurrency(xandPrice.volume24h) : '-'}
                            <span className="text-xs text-[#00FFAA] ml-1">+0.42%</span>
                        </p>
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">FDV</span>
                        </div>
                        <p className="text-lg font-bold text-white">{formatCurrency(xandMetrics.fdv)}</p>
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Droplets className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">Liquidity</span>
                        </div>
                        <p className="text-lg font-bold text-white">{formatCurrency(xandMetrics.liquidity)}</p>
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Coins className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">Max Supply</span>
                        </div>
                        <p className="text-lg font-bold text-white">{formatNumber(xandMetrics.maxSupply)}</p>
                    </div>
                    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Coins className="w-4 h-4 text-[#666]" />
                            <span className="text-xs text-[#666]">Circulating Supply</span>
                        </div>
                        <p className="text-lg font-bold text-white">{formatNumber(xandMetrics.circulatingSupply)}</p>
                    </div>
                </div>

                {/* Price Cards Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {prices.map((token) => (
                        <div key={token.symbol} className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${token.symbol === 'XAND'
                                        ? 'bg-[#1a2520]'
                                        : 'bg-[#1a1a25]'
                                        }`}>
                                        <span className={`text-base font-bold ${token.symbol === 'XAND'
                                            ? 'text-[#00FFAA]'
                                            : 'text-[#7B61FF]'
                                            }`}>
                                            {token.symbol.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-white">{token.name}</h3>
                                        <p className="text-xs text-[#666]">{token.symbol}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${token.change24h >= 0
                                    ? 'bg-[#0a2015] text-[#00FFAA]'
                                    : 'bg-[#200a0a] text-[#FF2D55]'
                                    }`}>
                                    {token.change24h >= 0 ? (
                                        <ArrowUpRight className="w-3 h-3" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3" />
                                    )}
                                    {Math.abs(token.change24h).toFixed(2)}%
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-2xl font-bold text-white">
                                    ${token.price < 1 ? token.price.toFixed(4) : token.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-2.5 rounded-lg bg-[#141414]">
                                    <p className="text-[10px] text-[#666]">24h Volume</p>
                                    <p className="text-sm font-semibold text-white mt-0.5">
                                        {formatCurrency(token.volume24h)}
                                    </p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#141414]">
                                    <p className="text-[10px] text-[#666]">Market Cap</p>
                                    <p className="text-sm font-semibold text-white mt-0.5">
                                        {formatCurrency(token.marketCap)}
                                    </p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#141414]">
                                    <p className="text-[10px] text-[#666]">24h High</p>
                                    <p className="text-sm font-semibold text-[#00FFAA] mt-0.5">
                                        ${token.high24h < 1 ? token.high24h.toFixed(4) : token.high24h.toFixed(2)}
                                    </p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#141414]">
                                    <p className="text-[10px] text-[#666]">24h Low</p>
                                    <p className="text-sm font-semibold text-[#FF2D55] mt-0.5">
                                        ${token.low24h < 1 ? token.low24h.toFixed(4) : token.low24h.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* External Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="https://birdeye.so/token/XANDjqhpRhVFijBaoXJxvGpsVqsWW5VGfp23cwkYRtd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:border-[#00FFAA]/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5 text-[#00FFAA]" />
                            <span className="font-medium text-white">Birdeye Charts</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#00FFAA]" />
                    </a>
                    <a
                        href="https://dexscreener.com/solana/XANDjqhpRhVFijBaoXJxvGpsVqsWW5VGfp23cwkYRtd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:border-[#7B61FF]/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-[#7B61FF]" />
                            <span className="font-medium text-white">DexScreener</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#7B61FF]" />
                    </a>
                    <a
                        href="https://jup.ag/swap/SOL-XAND"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-4 flex items-center justify-between group hover:border-[#FFB800]/30 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-[#FFB800]" />
                            <span className="font-medium text-white">Jupiter</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#666] group-hover:text-[#FFB800]" />
                    </a>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-xs text-[#666] py-4">
                    <p>Price data is for demonstration purposes. Connect to live APIs for real-time prices.</p>
                </div>
            </div>
        </div>
    )
}
