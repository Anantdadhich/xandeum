'use client'

import { useState, useEffect } from 'react'
import {
    ArrowRightLeft,
    ChevronDown,
    RefreshCw,
    Settings,
    AlertCircle,
    Wallet
} from 'lucide-react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

interface Token {
    symbol: string
    name: string
    icon: string
    balance: number
    price: number
}

const tokens: Token[] = [
    { symbol: 'SOL', name: 'Solana', icon: '◎', balance: 0, price: 98.45 },
    { symbol: 'XAND', name: 'Xandeum', icon: '✦', balance: 5000, price: 0.0234 },
    { symbol: 'USDC', name: 'USD Coin', icon: '$', balance: 250, price: 1.0 },
]

export default function SwapPage() {
    const { connection } = useConnection()
    const { connected, publicKey } = useWallet()
    const [fromToken, setFromToken] = useState<Token>(tokens[0])
    const [toToken, setToToken] = useState<Token>(tokens[1])
    const [fromAmount, setFromAmount] = useState<string>('')
    const [slippage, setSlippage] = useState<number>(0.5)
    const [showFromTokens, setShowFromTokens] = useState(false)
    const [showToTokens, setShowToTokens] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [isSwapping, setIsSwapping] = useState(false)

    // Fetch SOL Balance
    useEffect(() => {
        if (connected && publicKey) {
            connection.getBalance(publicKey).then((lamports) => {
                const solBalance = lamports / LAMPORTS_PER_SOL
                // Update local tokens constant and state if current token is SOL
                tokens[0].balance = solBalance
                if (fromToken.symbol === 'SOL') {
                    setFromToken(prev => ({ ...prev, balance: solBalance }))
                } else if (toToken.symbol === 'SOL') {
                    setToToken(prev => ({ ...prev, balance: solBalance }))
                }
            })
        }
    }, [connected, publicKey, connection, fromToken.symbol, toToken.symbol])

    const toAmount = fromAmount
        ? ((parseFloat(fromAmount) * fromToken.price) / toToken.price).toFixed(
            toToken.price < 1 ? 2 : 6
        )
        : ''

    const rate = fromToken.price / toToken.price
    const priceImpact = parseFloat(fromAmount) > 100 ? 0.15 : 0.05

    const handleSwapTokens = () => {
        const temp = fromToken
        setFromToken(toToken)
        setToToken(temp)
        setFromAmount('')
    }

    const handleMaxClick = () => {
        setFromAmount(fromToken.balance.toString())
    }

    const executeSwap = async () => {
        if (!connected) return
        setIsSwapping(true)
        // Mock swap execution
        setTimeout(() => {
            setIsSwapping(false)
            setFromAmount('')
        }, 1500)
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-main max-w-lg mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Swap Tokens</h1>
                    <p className="text-[var(--foreground-muted)] mt-2">
                        Powered by Jupiter Aggregator
                    </p>
                </div>

                {/* Swap Card */}
                <div className="glass-card p-6 space-y-4">
                    {/* Settings */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--foreground-muted)]">Swap</span>
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-lg hover:bg-[var(--card)] text-[var(--foreground-muted)] hover:text-white transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className="p-4 rounded-lg bg-[var(--background)] space-y-3">
                            <p className="text-sm font-medium text-white">Slippage Tolerance</p>
                            <div className="flex items-center gap-2">
                                {[0.1, 0.5, 1.0].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSlippage(s)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${slippage === s
                                            ? 'bg-[var(--accent)] text-black'
                                            : 'bg-[var(--card)] text-white hover:bg-[var(--card-hover)]'
                                            }`}
                                    >
                                        {s}%
                                    </button>
                                ))}
                                <input
                                    type="number"
                                    value={slippage}
                                    onChange={(e) => setSlippage(parseFloat(e.target.value) || 0.5)}
                                    className="w-20 px-3 py-2 rounded-lg bg-[var(--card)] text-white text-sm text-right"
                                    placeholder="0.5"
                                />
                            </div>
                        </div>
                    )}

                    {/* From Token */}
                    <div className="p-4 rounded-xl bg-[var(--background)]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[var(--foreground-muted)]">You pay</span>
                            <span className="text-sm text-[var(--foreground-muted)]">
                                Balance: {fromToken.balance.toFixed(4)}
                                <button
                                    onClick={handleMaxClick}
                                    className="ml-2 text-[var(--accent)] hover:underline"
                                >
                                    MAX
                                </button>
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="number"
                                value={fromAmount}
                                onChange={(e) => setFromAmount(e.target.value)}
                                placeholder="0.00"
                                className="flex-1 bg-transparent text-3xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                            />
                            <div className="relative">
                                <button
                                    onClick={() => setShowFromTokens(!showFromTokens)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--card-hover)] transition-colors"
                                >
                                    <span className="text-xl">{fromToken.icon}</span>
                                    <span className="font-semibold text-white">{fromToken.symbol}</span>
                                    <ChevronDown className="w-4 h-4 text-[var(--foreground-muted)]" />
                                </button>
                                {showFromTokens && (
                                    <div className="absolute top-full right-0 mt-2 w-48 py-2 rounded-xl bg-[var(--card)] border border-[var(--card-border)] shadow-xl z-10">
                                        {tokens.map((token) => (
                                            <button
                                                key={token.symbol}
                                                onClick={() => {
                                                    setFromToken(token)
                                                    setShowFromTokens(false)
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--card-hover)] text-left"
                                            >
                                                <span className="text-xl">{token.icon}</span>
                                                <div>
                                                    <p className="font-medium text-white">{token.symbol}</p>
                                                    <p className="text-xs text-[var(--foreground-muted)]">{token.name}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {fromAmount && (
                            <p className="text-sm text-[var(--foreground-muted)] mt-2">
                                ≈ ${(parseFloat(fromAmount) * fromToken.price).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-2 relative z-10">
                        <button
                            onClick={handleSwapTokens}
                            className="p-3 rounded-xl bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all group"
                        >
                            <ArrowRightLeft className="w-5 h-5 text-[var(--foreground-muted)] group-hover:text-[var(--accent)] rotate-90" />
                        </button>
                    </div>

                    {/* To Token */}
                    <div className="p-4 rounded-xl bg-[var(--background)]">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[var(--foreground-muted)]">You receive</span>
                            <span className="text-sm text-[var(--foreground-muted)]">
                                Balance: {toToken.balance.toFixed(4)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={toAmount}
                                readOnly
                                placeholder="0.00"
                                className="flex-1 bg-transparent text-3xl font-bold text-white placeholder:text-[var(--foreground-muted)] focus:outline-none"
                            />
                            <div className="relative">
                                <button
                                    onClick={() => setShowToTokens(!showToTokens)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--card-hover)] transition-colors"
                                >
                                    <span className="text-xl">{toToken.icon}</span>
                                    <span className="font-semibold text-white">{toToken.symbol}</span>
                                    <ChevronDown className="w-4 h-4 text-[var(--foreground-muted)]" />
                                </button>
                                {showToTokens && (
                                    <div className="absolute top-full right-0 mt-2 w-48 py-2 rounded-xl bg-[var(--card)] border border-[var(--card-border)] shadow-xl z-10">
                                        {tokens.map((token) => (
                                            <button
                                                key={token.symbol}
                                                onClick={() => {
                                                    setToToken(token)
                                                    setShowToTokens(false)
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[var(--card-hover)] text-left"
                                            >
                                                <span className="text-xl">{token.icon}</span>
                                                <div>
                                                    <p className="font-medium text-white">{token.symbol}</p>
                                                    <p className="text-xs text-[var(--foreground-muted)]">{token.name}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {toAmount && (
                            <p className="text-sm text-[var(--foreground-muted)] mt-2">
                                ≈ ${(parseFloat(toAmount) * toToken.price).toFixed(2)}
                            </p>
                        )}
                    </div>

                    {/* Rate Info */}
                    {fromAmount && (
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--foreground-muted)]">Rate</span>
                                <span className="text-white">
                                    1 {fromToken.symbol} = {rate.toFixed(rate < 1 ? 8 : 4)} {toToken.symbol}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--foreground-muted)]">Price Impact</span>
                                <span className={priceImpact > 0.1 ? 'text-yellow-400' : 'text-green-400'}>
                                    {priceImpact.toFixed(2)}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[var(--foreground-muted)]">Slippage</span>
                                <span className="text-white">{slippage}%</span>
                            </div>
                        </div>
                    )}

                    {/* Swap Button */}
                    {connected ? (
                        <button
                            onClick={executeSwap}
                            disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping}
                            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Wallet className="w-5 h-5" />
                            {isSwapping ? 'Swapping...' : 'Swap'}
                        </button>
                    ) : (
                        <div className="flex justify-center">
                            <WalletMultiButton style={{ width: '100%', justifyContent: 'center', backgroundColor: 'var(--accent)', color: 'black', borderRadius: '12px', height: '56px', fontSize: '18px', fontWeight: 'bold' }} />
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)] flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[var(--foreground-muted)]">
                        Verify the token address before swapping. New tokens may have high volatility or be scams.
                    </p>
                </div>
            </div>
        </div>
    )
}
