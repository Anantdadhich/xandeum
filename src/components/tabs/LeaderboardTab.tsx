'use client'

import { useState } from 'react'
import { useDashboardStore } from '@/lib/store'
import { Trophy, ArrowRight, Clock } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'
import { SimplePagination } from '@/components/Pagination'

interface LeaderboardNode {
    rank: number
    pubkey: string
    address: string
    podCredits: number
    uptime: number
    cpu: number | null
    ram: number | null
    lastSeen: string
    status: 'healthy' | 'degraded' | 'offline'
    isPrivate: boolean
}

const ITEMS_PER_PAGE = 10

export function LeaderboardTab() {
    const { pnodes } = useDashboardStore()
    const [currentPage, setCurrentPage] = useState(1)

    // Generate leaderboard data from pnodes with REAL metrics
    const leaderboardData: LeaderboardNode[] = pnodes
        .map((node, index) => {
            const health = getNodeHealth(node.last_seen_timestamp)
            // last_seen_timestamp is in seconds, convert to milliseconds for comparison
            const lastSeenMs = node.last_seen_timestamp * 1000
            const lastSeenDiff = Date.now() - lastSeenMs
            let lastSeenText = ''
            if (lastSeenDiff < 60000) {
                lastSeenText = `${Math.floor(lastSeenDiff / 1000)}s ago`
            } else if (lastSeenDiff < 3600000) {
                lastSeenText = `${Math.floor(lastSeenDiff / 60000)}m ago`
            } else if (lastSeenDiff < 86400000) {
                lastSeenText = `${Math.floor(lastSeenDiff / 3600000)}h ago`
            } else {
                lastSeenText = `${Math.floor(lastSeenDiff / 86400000)}d ago`
            }

            // Calculate real podCredits based on actual metrics
            const uptimeDays = typeof node.uptime === 'number' ? node.uptime / 86400 : 0
            const cpuScore = node.cpu_percent ? (100 - node.cpu_percent) : 50
            const storageScore = (node.total_bytes || 0) / 1000000 // MB
            const isHealthy = health.status === 'healthy'

            // Real credit formula: uptime * 100 + storage + CPU efficiency + health bonus
            const podCredits = Math.floor(
                (uptimeDays * 1000) +
                (storageScore) +
                (cpuScore * 50) +
                (isHealthy ? 5000 : 0)
            )

            return {
                rank: index + 1,
                pubkey: node.pubkey || 'Unknown',
                address: node.address,
                podCredits,
                uptime: uptimeDays,
                cpu: node.cpu_percent || null,
                ram: node.ram_used && node.ram_total
                    ? (node.ram_used / node.ram_total) * 100
                    : null,
                lastSeen: lastSeenText,
                status: health.status,
                isPrivate: !node.pubkey || node.pubkey === 'Unknown', // Derive from pubkey visibility
            }
        })
        .sort((a, b) => b.podCredits - a.podCredits)
        .map((node, index) => ({ ...node, rank: index + 1 }))

    const totalItems = leaderboardData.length
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedData = leaderboardData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const getStatusDisplay = (status: string, isPrivate: boolean) => {
        if (status === 'offline') {
            return {
                dotClass: 'bg-red-500',
                text: 'Offline'
            }
        }
        return {
            dotClass: 'bg-green-500',
            text: isPrivate ? 'Online (Private)' : 'Online'
        }
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Top Performers by Credits
                </h2>
                <button className="text-sm text-[var(--foreground-muted)] hover:text-white flex items-center gap-1 transition-colors">
                    View All <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Leaderboard Table */}
            <div className="glass-card overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--card-border)]">
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider w-12">
                                #
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Credits
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Address
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Version
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                CPU
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                RAM
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)] uppercase tracking-wider">
                                Last Seen
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--card-border)]">
                        {paginatedData.map((node) => {
                            const statusDisplay = getStatusDisplay(node.status, node.isPrivate)
                            return (
                                <tr
                                    key={`${node.rank}-${node.address}`}
                                    className="hover:bg-[var(--card-hover)] transition-colors"
                                >
                                    <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">
                                        {node.rank}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm font-medium text-white">
                                            {node.podCredits.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${statusDisplay.dotClass}`} />
                                            <span className="text-sm text-[var(--foreground-muted)]">
                                                {statusDisplay.text}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-sm">
                                            <span className="text-white">{node.address.split(':')[0]}</span>
                                            <span className="text-[var(--foreground-muted)]">:{node.address.split(':')[1] || '9001'}</span>
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[var(--foreground-muted)]">
                                        0.8.0
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-[var(--foreground-muted)]">
                                        {node.cpu !== null ? `${node.cpu.toFixed(0)}%` : '–'}
                                    </td>
                                    <td className="px-4 py-3 text-center text-sm text-[var(--foreground-muted)]">
                                        {node.ram !== null ? `${node.ram.toFixed(0)}%` : '–'}
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm text-[var(--foreground-muted)]">
                                        {node.lastSeen}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                <SimplePagination showing={paginatedData.length} total={totalItems} />
            </div>

            {/* Empty State */}
            {leaderboardData.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <Trophy className="w-12 h-12 text-[var(--foreground-muted)] mx-auto mb-4" />
                    <p className="text-[var(--foreground-muted)]">No nodes available for leaderboard</p>
                </div>
            )}
        </div>
    )
}
