'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/lib/store'
import { KPICards } from '@/components/kpicards'
import { SearchFilter } from '@/components/searchfilter'
import { PNodesTable } from '@/components/pnodestable'
import { RefreshCw, AlertCircle, Zap } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'

const REFRESH_INTERVAL = 5 * 60 * 1000

export function Dashboard() {
    const {
        pnodes,
        metrics,
        isLoading,
        error,
        lastUpdated,
        searchQuery,
        sortColumn,
        sortDirection,
        setSearchQuery,
        setSorting,
        refreshData,
    } = useDashboardStore()

    useEffect(() => {
        refreshData()
        const interval = setInterval(() => {
            refreshData()
        }, REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [refreshData])

    const handleManualRefresh = () => {
        refreshData()
    }

    return (
        <div className="container-main space-y-8">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="kpi-icon">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Network Overview</h2>
                        <p className="text-sm text-[var(--foreground-muted)]">
                            Real-time monitoring dashboard
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {lastUpdated && (
                        <span className="text-sm text-[var(--foreground-muted)]">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <button
                        onClick={handleManualRefresh}
                        disabled={isLoading}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <RefreshCw
                            className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="glass-card p-4 border-[var(--status-offline)] flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-[var(--status-offline)] mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-[var(--status-offline)]">Error</h3>
                        <p className="text-sm text-[var(--foreground-muted)] mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* KPI Cards */}
            <KPICards metrics={metrics} isLoading={isLoading} />

            {/* pNodes Table Section */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <SearchFilter
                            value={searchQuery}
                            onChange={setSearchQuery}
                            placeholder="Search by pubkey or IP address..."
                        />
                    </div>
                </div>

                {isLoading && !pnodes.length ? (
                    <div className="glass-card p-12 text-center">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <RefreshCw className="h-8 w-8 animate-spin text-[var(--accent)]" />
                            <p className="text-[var(--foreground-muted)]">Loading pNodes data...</p>
                        </div>
                    </div>
                ) : (
                    <PNodesTable
                        pnodes={pnodes.map((n) => {
                            const ip = n.address.split(':')[0] || n.address
                            const utilization = (typeof n.total_bytes === 'number' && typeof n.file_size === 'number' && n.file_size > 0)
                                ? (n.total_bytes / n.file_size) * 100
                                : undefined
                            const status = getNodeHealth(n.last_seen_timestamp).status
                            // Uptime from API is in seconds - convert to days for display
                            const uptimeDays = typeof n.uptime === 'number' ? n.uptime / 86400 : undefined
                            return {
                                pubkey: n.pubkey || '',
                                ip,
                                uptime: uptimeDays,
                                utilizationPercent: utilization,
                                status,
                            }
                        })}
                        searchQuery={searchQuery}
                        sortColumn={
                            (['pubkey', 'uptime', 'utilizationPercent'] as readonly string[]).includes(
                                (sortColumn as unknown as string)
                            )
                                ? (sortColumn as any)
                                : null
                        }
                        sortDirection={sortDirection}
                        onSort={(col) => setSorting(col as any)}
                    />
                )}
            </div>

            {/* Stats Summary */}
            <div className="text-center text-sm text-[var(--foreground-muted)] py-4">
                <p>
                    Showing <span className="text-[var(--accent)] font-semibold">{pnodes.length}</span> provider node{pnodes.length !== 1 ? 's' : ''}
                </p>
            </div>
        </div>
    )
}
