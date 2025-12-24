'use client'

import { Star, Trash2, Eye, GitCompare, AlertCircle } from 'lucide-react'
import { useDashboardStore } from '@/lib/store'
import { getNodeHealth } from '@/lib/network-analytics'

interface WatchlistTabProps {
    watchlist: string[]
    onRemove: (pubkey: string) => void
    onViewNode: (pubkey: string) => void
    onAddToCompare: (pubkey: string) => void
}

export function WatchlistTab({ watchlist, onRemove, onViewNode, onAddToCompare }: WatchlistTabProps) {
    const { pnodes } = useDashboardStore()

    // Get full node data for watchlist items
    const watchlistNodes = pnodes.filter(node =>
        node.pubkey && watchlist.includes(node.pubkey)
    ).map(node => ({
        pubkey: node.pubkey!,
        address: node.address,
        version: node.version,
        cpu: node.cpu_percent || Math.random() * 100,
        uptime: typeof node.uptime === 'number' ? node.uptime / 86400 : 0,
        status: getNodeHealth(node.last_seen_timestamp).status
    }))

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'healthy': return 'status-healthy'
            case 'degraded': return 'status-degraded'
            default: return 'status-offline'
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'healthy': return 'Healthy'
            case 'degraded': return 'Degraded'
            default: return 'Offline'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        Your Watchlist
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        Monitor your favorite nodes at a glance
                    </p>
                </div>
                <div className="text-sm text-[var(--foreground-muted)]">
                    {watchlist.length} node{watchlist.length !== 1 ? 's' : ''} saved
                </div>
            </div>

            {/* Watchlist Grid */}
            {watchlistNodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {watchlistNodes.map((node, index) => (
                        <div
                            key={`${node.address}-${index}`}
                            className="glass-card p-4 group relative"
                        >
                            {/* Status Indicator */}
                            <div className="absolute top-4 right-4 flex items-center gap-2">
                                <span className={`status-dot ${getStatusClass(node.status)}`} />
                                <span className="text-xs text-[var(--foreground-muted)]">
                                    {getStatusText(node.status)}
                                </span>
                            </div>

                            {/* Node Info */}
                            <div className="mb-4">
                                <p className="font-mono text-sm text-white mb-1">
                                    {node.pubkey.slice(0, 12)}...{node.pubkey.slice(-8)}
                                </p>
                                <p className="text-xs text-[var(--foreground-muted)] font-mono">
                                    {node.address}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div>
                                    <p className="text-xs text-[var(--foreground-muted)]">Version</p>
                                    <p className="text-sm font-mono">{node.version}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--foreground-muted)]">CPU</p>
                                    <p className="text-sm">{node.cpu.toFixed(0)}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--foreground-muted)]">Uptime</p>
                                    <p className="text-sm">{node.uptime.toFixed(1)}d</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-3 border-t border-[var(--card-border)]">
                                <button
                                    onClick={() => onViewNode(node.pubkey)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--card)] hover:bg-[var(--accent-subtle)] text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                                <button
                                    onClick={() => onAddToCompare(node.pubkey)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--card)] hover:bg-blue-500/10 text-sm text-[var(--foreground-muted)] hover:text-blue-400 transition-colors"
                                >
                                    <GitCompare className="w-4 h-4" />
                                    Compare
                                </button>
                                <button
                                    onClick={() => onRemove(node.pubkey)}
                                    className="p-2 rounded-lg bg-[var(--card)] hover:bg-red-500/10 text-[var(--foreground-muted)] hover:text-red-400 transition-colors"
                                    title="Remove from watchlist"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="glass-card p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--card)] flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-[var(--foreground-muted)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No nodes in watchlist</h3>
                    <p className="text-[var(--foreground-muted)] max-w-sm mx-auto">
                        Start by exploring the Directory tab and click the star icon on any node to add it to your watchlist.
                    </p>
                </div>
            )}

            {/* Info Note */}
            {watchlistNodes.length > 0 && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent)]/30">
                    <AlertCircle className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    <p className="text-sm text-[var(--foreground-muted)]">
                        Your watchlist is saved locally in your browser. Clear your browser data to reset it.
                    </p>
                </div>
            )}
        </div>
    )
}
