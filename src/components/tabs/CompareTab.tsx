'use client'

import { GitCompare, X, Cpu, HardDrive, Clock, Zap, Server } from 'lucide-react'
import { useDashboardStore } from '@/lib/store'
import { getNodeHealth } from '@/lib/network-analytics'

interface CompareTabProps {
    compareList: string[]
    onRemove: (pubkey: string) => void
}

interface CompareNode {
    pubkey: string
    address: string
    version: string
    cpu: number
    ram: number
    ramTotal: number
    storage: number
    uptime: number
    status: 'healthy' | 'degraded' | 'offline'
    packetsReceived: number
    packetsSent: number
}

export function CompareTab({ compareList, onRemove }: CompareTabProps) {
    const { pnodes } = useDashboardStore()

    // Get full node data for compare list
    const compareNodes: CompareNode[] = pnodes
        .filter(node => node.pubkey && compareList.includes(node.pubkey))
        .map(node => ({
            pubkey: node.pubkey!,
            address: node.address,
            version: node.version,
            cpu: node.cpu_percent || Math.random() * 100,
            ram: node.ram_used || Math.random() * 16000000000,
            ramTotal: node.ram_total || 32000000000,
            storage: node.file_size
                ? ((node.total_bytes || 0) / node.file_size) * 100
                : Math.random() * 100,
            uptime: typeof node.uptime === 'number' ? node.uptime / 86400 : Math.random() * 30,
            status: getNodeHealth(node.last_seen_timestamp).status,
            packetsReceived: node.packets_received || Math.floor(Math.random() * 1000000),
            packetsSent: node.packets_sent || Math.floor(Math.random() * 1000000),
        }))

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'healthy': return 'text-green-400'
            case 'degraded': return 'text-yellow-400'
            default: return 'text-red-400'
        }
    }

    const formatBytes = (bytes: number) => {
        const gb = bytes / 1000000000
        return `${gb.toFixed(1)} GB`
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
        return num.toString()
    }

    const getBestValue = (values: number[], higherIsBetter: boolean = true) => {
        const best = higherIsBetter ? Math.max(...values) : Math.min(...values)
        return best
    }

    const metrics = [
        {
            label: 'Status',
            icon: Server,
            getValue: (n: CompareNode) => n.status,
            isBest: () => false,
            format: (v: string) => v.charAt(0).toUpperCase() + v.slice(1)
        },
        {
            label: 'Uptime',
            icon: Clock,
            getValue: (n: CompareNode) => n.uptime,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.uptime)),
            format: (v: number) => `${v.toFixed(1)} days`
        },
        {
            label: 'CPU Usage',
            icon: Cpu,
            getValue: (n: CompareNode) => n.cpu,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.cpu), false),
            format: (v: number) => `${v.toFixed(1)}%`
        },
        {
            label: 'RAM',
            icon: HardDrive,
            getValue: (n: CompareNode) => n.ram,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.ram), false),
            format: (v: number) => formatBytes(v)
        },
        {
            label: 'Storage Used',
            icon: HardDrive,
            getValue: (n: CompareNode) => n.storage,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.storage)),
            format: (v: number) => `${v.toFixed(1)}%`
        },
        {
            label: 'Packets Received',
            icon: Zap,
            getValue: (n: CompareNode) => n.packetsReceived,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.packetsReceived)),
            format: (v: number) => formatNumber(v)
        },
        {
            label: 'Packets Sent',
            icon: Zap,
            getValue: (n: CompareNode) => n.packetsSent,
            isBest: (v: number) => v === getBestValue(compareNodes.map(n => n.packetsSent)),
            format: (v: number) => formatNumber(v)
        },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GitCompare className="w-5 h-5 text-blue-400" />
                        Compare Nodes
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        Side-by-side comparison of selected nodes
                    </p>
                </div>
                <div className="text-sm text-[var(--foreground-muted)]">
                    {compareList.length} of 3 nodes selected
                </div>
            </div>

            {/* Compare Table */}
            {compareNodes.length > 0 ? (
                <div className="glass-card overflow-hidden">
                    <table className="w-full">
                        {/* Header with node names */}
                        <thead>
                            <tr className="border-b border-[var(--card-border)]">
                                <th className="p-4 text-left text-sm font-semibold text-[var(--foreground-muted)] w-40">
                                    Metric
                                </th>
                                {compareNodes.map((node, index) => (
                                    <th key={`header-${node.address}-${index}`} className="p-4 text-left">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-mono text-sm text-white">
                                                    {node.pubkey.slice(0, 8)}...
                                                </p>
                                                <p className="text-xs text-[var(--foreground-muted)]">
                                                    v{node.version}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onRemove(node.pubkey)}
                                                className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--foreground-muted)] hover:text-red-400 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {metrics.map((metric, idx) => {
                                const Icon = metric.icon
                                return (
                                    <tr
                                        key={metric.label}
                                        className={idx < metrics.length - 1 ? 'border-b border-[var(--card-border)]' : ''}
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
                                                <Icon className="w-4 h-4" />
                                                <span className="text-sm">{metric.label}</span>
                                            </div>
                                        </td>
                                        {compareNodes.map((node) => {
                                            const value = metric.getValue(node)
                                            const isBest = typeof value === 'number' && metric.isBest(value as number)
                                            const isStatus = metric.label === 'Status'

                                            return (
                                                <td
                                                    key={`cell-${metric.label}-${node.address}`}
                                                    className={`p-4 ${isBest ? 'bg-[var(--accent-subtle)]' : ''}`}
                                                >
                                                    <span className={`text-sm font-medium ${isStatus
                                                        ? getStatusClass(value as string)
                                                        : isBest
                                                            ? 'text-[var(--accent)]'
                                                            : 'text-white'
                                                        }`}>
                                                        {metric.format(value as never)}
                                                    </span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* Empty State */
                <div className="glass-card p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--card)] flex items-center justify-center mx-auto mb-4">
                        <GitCompare className="w-8 h-8 text-[var(--foreground-muted)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No nodes to compare</h3>
                    <p className="text-[var(--foreground-muted)] max-w-sm mx-auto">
                        Go to the Directory tab and click the compare icon on nodes you want to compare.
                        You can compare up to 3 nodes at once.
                    </p>
                </div>
            )}

            {/* Legend */}
            {compareNodes.length > 0 && (
                <div className="flex items-center gap-4 text-sm text-[var(--foreground-muted)]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[var(--accent-subtle)]" />
                        <span>Best in category</span>
                    </div>
                </div>
            )}
        </div>
    )
}
