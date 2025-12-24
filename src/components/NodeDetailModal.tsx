'use client'

import { X, Star, GitCompare, Copy, Check, MapPin, Server, Cpu, HardDrive, Clock, Zap, Globe } from 'lucide-react'
import { useState } from 'react'
import { useDashboardStore } from '@/lib/store'
import { getNodeHealth } from '@/lib/network-analytics'

interface NodeDetailModalProps {
    pubkey: string | null
    onClose: () => void
    onAddToWatchlist: (pubkey: string) => void
    onAddToCompare: (pubkey: string) => void
    isInWatchlist: boolean
}

export function NodeDetailModal({
    pubkey,
    onClose,
    onAddToWatchlist,
    onAddToCompare,
    isInWatchlist
}: NodeDetailModalProps) {
    const { pnodes } = useDashboardStore()
    const [copiedField, setCopiedField] = useState<string | null>(null)

    if (!pubkey) return null

    const node = pnodes.find(n => n.pubkey === pubkey)
    if (!node) return null

    const health = getNodeHealth(node.last_seen_timestamp)

    // Mock location data (in production, this would come from geo API)
    const location = {
        city: 'San Francisco',
        region: 'California',
        country: 'United States',
        lat: 37.7749,
        lon: -122.4194,
    }

    const stats = {
        uptime: typeof node.uptime === 'number' ? node.uptime / 86400 : 0,
        cpu: node.cpu_percent || 0,
        ramUsed: node.ram_used || 0,
        ramTotal: node.ram_total || 0,
        storageUsed: node.total_bytes || 0,
        storageTotal: node.file_size || 0,
        packetsReceived: node.packets_received || 0,
        packetsSent: node.packets_sent || 0,
        activeStreams: node.active_streams || 0,
    }

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(field)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const formatBytes = (bytes: number) => {
        if (bytes >= 1e12) return `${(bytes / 1e12).toFixed(2)} TB`
        if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`
        if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`
        return `${bytes} B`
    }

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-[var(--card-border)] bg-[var(--card)]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                            <Server className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Node Details</h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={`status-dot ${getStatusClass(health.status)}`} />
                                <span className="text-sm text-[var(--foreground-muted)]">
                                    {getStatusText(health.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onAddToWatchlist(pubkey)}
                            className={`p-2 rounded-lg transition-colors ${isInWatchlist
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'hover:bg-[var(--accent-subtle)] text-[var(--foreground-muted)] hover:text-yellow-400'
                                }`}
                            title={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                        >
                            <Star className={`w-5 h-5 ${isInWatchlist ? 'fill-current' : ''}`} />
                        </button>
                        <button
                            onClick={() => onAddToCompare(pubkey)}
                            className="p-2 rounded-lg hover:bg-[var(--accent-subtle)] text-[var(--foreground-muted)] hover:text-blue-400 transition-colors"
                            title="Add to compare"
                        >
                            <GitCompare className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-[var(--card)] text-[var(--foreground-muted)] hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Identity Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                            Identity
                        </h3>

                        {/* Pubkey */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)]">
                            <div>
                                <p className="text-xs text-[var(--foreground-muted)]">Node ID (Pubkey)</p>
                                <p className="font-mono text-sm text-white mt-1 break-all">
                                    {pubkey}
                                </p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(pubkey, 'pubkey')}
                                className="p-2 rounded-lg hover:bg-[var(--card)] text-[var(--foreground-muted)] hover:text-white transition-colors shrink-0"
                            >
                                {copiedField === 'pubkey' ? (
                                    <Check className="w-4 h-4 text-[var(--accent)]" />
                                ) : (
                                    <Copy className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Addresses */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">Gossip Address</p>
                                <p className="font-mono text-sm text-white mt-1">{node.address}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">RPC Address</p>
                                <p className="font-mono text-sm text-white mt-1">
                                    {node.address.replace(/:\d+$/, ':8899')}
                                </p>
                            </div>
                        </div>

                        {/* Version */}
                        <div className="p-3 rounded-lg bg-[var(--background)]">
                            <p className="text-xs text-[var(--foreground-muted)]">Version</p>
                            <p className="text-sm text-white mt-1">{node.version}</p>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Location
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">City</p>
                                <p className="text-sm text-white mt-1">{location.city}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">Region</p>
                                <p className="text-sm text-white mt-1">{location.region}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">Country</p>
                                <p className="text-sm text-white mt-1">{location.country}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)]">
                                <p className="text-xs text-[var(--foreground-muted)]">Coordinates</p>
                                <p className="text-sm text-white mt-1 font-mono">
                                    {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Section */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Performance
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Uptime */}
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="flex items-center gap-2 text-[var(--foreground-muted)] mb-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs">Uptime</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats.uptime.toFixed(1)}</p>
                                <p className="text-xs text-[var(--foreground-muted)]">days</p>
                            </div>

                            {/* CPU */}
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="flex items-center gap-2 text-[var(--foreground-muted)] mb-2">
                                    <Cpu className="w-4 h-4" />
                                    <span className="text-xs">CPU Usage</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{stats.cpu.toFixed(1)}%</p>
                                <div className="w-full h-1.5 bg-[var(--card)] rounded-full mt-2 overflow-hidden">
                                    <div
                                        className="h-full bg-[var(--accent)] rounded-full"
                                        style={{ width: `${Math.min(stats.cpu, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* RAM */}
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="flex items-center gap-2 text-[var(--foreground-muted)] mb-2">
                                    <HardDrive className="w-4 h-4" />
                                    <span className="text-xs">RAM Usage</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {stats.ramTotal > 0
                                        ? ((stats.ramUsed / stats.ramTotal) * 100).toFixed(1)
                                        : '0'}%
                                </p>
                                <p className="text-xs text-[var(--foreground-muted)]">
                                    {formatBytes(stats.ramUsed)} / {formatBytes(stats.ramTotal)}
                                </p>
                            </div>

                            {/* Storage */}
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <div className="flex items-center gap-2 text-[var(--foreground-muted)] mb-2">
                                    <HardDrive className="w-4 h-4" />
                                    <span className="text-xs">Storage</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {stats.storageTotal > 0
                                        ? ((stats.storageUsed / stats.storageTotal) * 100).toFixed(1)
                                        : '0'}%
                                </p>
                                <p className="text-xs text-[var(--foreground-muted)]">
                                    {formatBytes(stats.storageUsed)} / {formatBytes(stats.storageTotal)}
                                </p>
                            </div>
                        </div>

                        {/* Network Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg bg-[var(--background)] text-center">
                                <p className="text-xs text-[var(--foreground-muted)]">Packets Received</p>
                                <p className="text-lg font-bold text-white mt-1">
                                    {stats.packetsReceived.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)] text-center">
                                <p className="text-xs text-[var(--foreground-muted)]">Packets Sent</p>
                                <p className="text-lg font-bold text-white mt-1">
                                    {stats.packetsSent.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-[var(--background)] text-center">
                                <p className="text-xs text-[var(--foreground-muted)]">Active Streams</p>
                                <p className="text-lg font-bold text-white mt-1">
                                    {stats.activeStreams}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
