'use client'

import Link from 'next/link'
import { Activity, Info } from 'lucide-react'
import { useState } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { usePathname } from 'next/navigation'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function Header() {
    const pathname = usePathname()
    // Placeholder for actual network status - should eventually come from props or a hook
    const networkStatus: 'healthy' | 'degraded' | 'offline' = 'healthy';

    const statusConfig = {
        healthy: { class: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]', text: 'Network Operational' },
        degraded: { class: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]', text: 'Performance Degraded' },
        offline: { class: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]', text: 'Network Offline' }
    };

    const status = statusConfig[networkStatus];
    const [showAbout, setShowAbout] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
            <div className="container-main flex h-16 items-center justify-end">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAbout(true)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--card-border)] hover:bg-[var(--card)] transition-colors text-sm text-[var(--foreground-muted)] hover:text-white"
                        title="About Project"
                    >
                        <Info className="w-4 h-4" />
                        <span className="hidden md:inline">About</span>
                    </button>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--card-border)]">
                        <span className={`status-dot ${status.class}`}></span>
                        <span className="text-sm text-[var(--foreground-muted)]">{status.text}</span>
                    </div>
                    {(pathname === '/stake' || pathname === '/swap') && (
                        <WalletMultiButton style={{ backgroundColor: 'var(--accent)', color: 'black', borderRadius: '12px', height: '40px', fontWeight: 600 }} />
                    )}
                </div>
            </div>

            {/* About Modal */}
            {showAbout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-lg glass-card p-6 border border-[var(--card-border)] animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setShowAbout(false)}
                            className="absolute top-4 right-4 text-[var(--foreground-muted)] hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Activity className="w-6 h-6 text-[var(--accent)]" />
                            Xandeum Explorer
                        </h2>
                        <p className="text-[var(--accent)] text-sm mb-6 font-mono">XND-BOUNTY-2025</p>

                        <div className="space-y-4 text-sm text-[var(--foreground-muted)]">
                            <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--card-border)]">
                                <h3 className="text-white font-semibold mb-2">What is Xandeum?</h3>
                                <p>Xandeum is a scalable storage layer for Solana dApps, enabling exabyte-scale storage accounts driven by a network of storage provider nodes (pNodes).</p>
                            </div>

                            <div className="p-4 rounded-lg bg-[var(--card)] border border-[var(--card-border)]">
                                <h3 className="text-white font-semibold mb-2">About this Dashboard</h3>
                                <p>This analytics platform provides real-time visibility into the Xandeum network. It features:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1 ml-1">
                                    <li>Monitoring 250+ live pNodes via Gossip/RPC</li>
                                    <li>Real-time Health Trends & Leaderboards</li>
                                    <li>Native Staking & Token Swap (Devnet)</li>
                                    <li>Live SOL Market Data terminal</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowAbout(false)}
                                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition-opacity"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
