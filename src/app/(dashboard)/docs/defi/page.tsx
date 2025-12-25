'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, Coins, ArrowRightLeft, TrendingUp, ArrowRight } from 'lucide-react'

export default function DefiPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container-main max-w-4xl mx-auto space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documentation
                </Link>

                {/* Header */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">DeFi Integration</h1>
                    </div>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        Integrate Xandeum DeFi features into your applications.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {/* Overview */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Available Features</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center mb-3">
                                    <Coins className="w-5 h-5 text-[var(--accent)]" />
                                </div>
                                <h3 className="font-medium text-white mb-2">Liquid Staking</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Stake SOL and receive XANDsol while earning ~7.2% APY.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
                                    <ArrowRightLeft className="w-5 h-5 text-purple-400" />
                                </div>
                                <h3 className="font-medium text-white mb-2">Token Swaps</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Swap tokens via Jupiter aggregator integration.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                                    <TrendingUp className="w-5 h-5 text-orange-400" />
                                </div>
                                <h3 className="font-medium text-white mb-2">Price Feeds</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Access real-time XAND and SOL price data.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Staking Integration */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Liquid Staking Integration</h2>

                        <p className="text-[var(--foreground-muted)] mb-4">
                            Integrate XANDsol liquid staking into your dApp:
                        </p>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-white mb-2">Install SDK</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`npm install @xandeum/staking-sdk`}
                                    </code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">Stake SOL</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`import { XandeumStaking } from '@xandeum/staking-sdk';

const staking = new XandeumStaking(connection);

// Stake 1 SOL
const tx = await staking.stake({
  amount: 1 * LAMPORTS_PER_SOL,
  wallet: userWallet,
});

// Returns XANDsol to user's wallet`}
                                    </code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">Unstake</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`// Unstake XANDsol
const tx = await staking.unstake({
  amount: xandsolAmount,
  wallet: userWallet,
});

// SOL returned after 2-3 day cooldown`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Swap Integration */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Swap Integration</h2>

                        <p className="text-[var(--foreground-muted)] mb-4">
                            Integrate token swaps using Jupiter:
                        </p>

                        <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                            <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                {`import { Jupiter } from '@jup-ag/core';

const jupiter = await Jupiter.load({
  connection,
  cluster: 'mainnet-beta',
  user: userWallet,
});

// Get swap routes
const routes = await jupiter.computeRoutes({
  inputMint: SOL_MINT,
  outputMint: XAND_MINT,
  amount: 1 * LAMPORTS_PER_SOL,
  slippage: 0.5,
});

// Execute swap
const { execute } = await jupiter.exchange({
  routeInfo: routes.routesInfos[0],
});

const result = await execute();`}
                            </code>
                        </pre>
                    </section>

                    {/* Price Feeds */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Price Feeds</h2>

                        <p className="text-[var(--foreground-muted)] mb-4">
                            Access real-time price data via API:
                        </p>

                        <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                            <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                {`// Fetch prices
const response = await fetch('/api/trading');
const { data } = await response.json();

console.log(data.xand.price);  // 0.0234
console.log(data.sol.price);   // 98.45

// WebSocket for real-time updates
const ws = new WebSocket('wss://api.xandeum.io/prices');
ws.onmessage = (event) => {
  const prices = JSON.parse(event.data);
  updateUI(prices);
};`}
                            </code>
                        </pre>
                    </section>

                    {/* Next Steps */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
                        <span className="text-[var(--foreground-muted)]">Need API details?</span>
                        <Link
                            href="/docs/api"
                            className="btn-primary py-2 px-4 flex items-center gap-2"
                        >
                            API Reference
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
