'use client'

import Link from 'next/link'
import { Activity } from 'lucide-react'
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

    return (
        <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-xl">
            <div className="container-main flex h-16 items-center justify-end">
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--card-border)]">
                        <span className={`status-dot ${status.class}`}></span>
                        <span className="text-sm text-[var(--foreground-muted)]">{status.text}</span>
                    </div>
                    {(pathname === '/stake' || pathname === '/swap') && (
                        <WalletMultiButton style={{ backgroundColor: 'var(--accent)', color: 'black', borderRadius: '12px', height: '40px', fontWeight: 600 }} />
                    )}
                </div>
            </div>
        </header>
    )
}
