'use client'

import Link from 'next/link'
import { Activity } from 'lucide-react'

interface HeaderProps {
    networkStatus?: 'healthy' | 'degraded' | 'offline'
}

export function Header({ networkStatus = 'healthy' }: HeaderProps) {
    const statusConfig = {
        healthy: { text: 'Network Healthy', class: 'status-healthy' },
        degraded: { text: 'Network Degraded', class: 'status-degraded' },
        offline: { text: 'Network Issues', class: 'status-offline' },
    }

    const status = statusConfig[networkStatus]

    return (
        <header className="border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container-main">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                            <Activity className="w-5 h-5 text-[var(--accent)] group-hover:text-black transition-colors" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white">Xandeum</h1>
                            <p className="text-xs text-[var(--foreground-muted)]">pNodes Analytics</p>
                        </div>
                    </Link>

                    {/* Network Status */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--card-border)]">
                            <span className={`status-dot ${status.class}`}></span>
                            <span className="text-sm text-[var(--foreground-muted)]">{status.text}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
