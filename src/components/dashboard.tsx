'use client'

import { useEffect, useState, useCallback } from 'react'
import { useDashboardStore } from '@/lib/store'
import { KPICards } from '@/components/kpicards'
import { SearchFilter } from '@/components/searchfilter'
import { PNodesTable } from '@/components/pnodestable'
import { VersionDistribution } from '@/components/charts/VersionDistribution'
import { HealthTrend } from '@/components/charts/HealthTrend'
import { NetworkHealthScore } from '@/components/charts/NetworkHealthScore'
import NodeMap from '@/components/maps/index'
import { DashboardTabs, TabId } from '@/components/tabs/DashboardTabs'
import { LeaderboardTab } from '@/components/tabs/LeaderboardTab'
import { DirectoryTab } from '@/components/tabs/DirectoryTab'
import { WatchlistTab } from '@/components/tabs/WatchlistTab'
import { CompareTab } from '@/components/tabs/CompareTab'
import { AnalyticsTab } from '@/components/tabs/AnalyticsTab'
import { NodeDetailModal } from '@/components/NodeDetailModal'
import { RefreshCw, AlertCircle, Zap, BarChart2 } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'

const REFRESH_INTERVAL = 5 * 60 * 1000
const WATCHLIST_KEY = 'xandeum_watchlist'
const COMPARE_KEY = 'xandeum_compare'

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

    const [activeTab, setActiveTab] = useState<TabId>('overview')
    const [watchlist, setWatchlist] = useState<string[]>([])
    const [compareList, setCompareList] = useState<string[]>([])
    const [selectedNode, setSelectedNode] = useState<string | null>(null)

    // Load watchlist and compare list from localStorage
    useEffect(() => {
        const savedWatchlist = localStorage.getItem(WATCHLIST_KEY)
        const savedCompare = localStorage.getItem(COMPARE_KEY)
        if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist))
        if (savedCompare) setCompareList(JSON.parse(savedCompare))
    }, [])

    // Save watchlist to localStorage
    useEffect(() => {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist))
    }, [watchlist])

    // Save compare list to localStorage
    useEffect(() => {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(compareList))
    }, [compareList])

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

    const handleAddToWatchlist = useCallback((pubkey: string) => {
        setWatchlist(prev => {
            if (prev.includes(pubkey)) {
                return prev.filter(p => p !== pubkey)
            }
            return [...prev, pubkey]
        })
    }, [])

    const handleRemoveFromWatchlist = useCallback((pubkey: string) => {
        setWatchlist(prev => prev.filter(p => p !== pubkey))
    }, [])

    const handleAddToCompare = useCallback((pubkey: string) => {
        setCompareList(prev => {
            if (prev.includes(pubkey)) {
                return prev.filter(p => p !== pubkey)
            }
            if (prev.length >= 3) {
                // Replace oldest
                return [...prev.slice(1), pubkey]
            }
            return [...prev, pubkey]
        })
    }, [])

    const handleRemoveFromCompare = useCallback((pubkey: string) => {
        setCompareList(prev => prev.filter(p => p !== pubkey))
    }, [])

    const handleViewNode = useCallback((pubkey: string) => {
        setSelectedNode(pubkey)
    }, [])

    // Prep data for NodeMap
    const mapNodes = pnodes.map(n => ({
        ip: n.address.split(':')[0] || n.address,
        pubkey: n.pubkey || '',
        status: getNodeHealth(n.last_seen_timestamp).status
    }))

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        {/* KPI Cards */}
                        <KPICards metrics={metrics} isLoading={isLoading} />

                        {/* Analytics Visualizations */}
                        {metrics && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[400px]">
                                {/* Version Distribution (Pie) */}
                                <div className="lg:col-span-1 h-full">
                                    <VersionDistribution data={metrics.versions.distribution} />
                                </div>

                                {/* Node Map (Global) */}
                                <div className="lg:col-span-2 h-full">
                                    <NodeMap nodes={mapNodes} />
                                </div>
                            </div>
                        )}

                        {/* Secondary Charts Row */}
                        {metrics && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-1">
                                    <NetworkHealthScore metrics={{ ...metrics.health, ...metrics.totals }} />
                                </div>
                                <div className="lg:col-span-2">
                                    <HealthTrend />
                                </div>
                            </div>
                        )}

                        {/* pNodes Table Section */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <BarChart2 className="w-5 h-5 text-accent" />
                                    Active Provider Nodes
                                </h3>
                                <SearchFilter
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search by pubkey or IP address..."
                                />
                            </div>

                            {isLoading && !pnodes.length ? (
                                <div className="glass-card p-12 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <RefreshCw className="h-8 w-8 animate-spin text-accent" />
                                        <p className="text-muted-foreground">Loading pNodes data...</p>
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
                                        const uptimeDays = typeof n.uptime === 'number' ? n.uptime / 86400 : undefined
                                        return {
                                            address: n.address,
                                            pubkey: n.pubkey || '',
                                            ip,
                                            uptime: uptimeDays,
                                            utilizationPercent: utilization,
                                            status,
                                        }
                                    })}
                                    searchQuery={searchQuery}
                                    sortColumn={
                                        sortColumn && ['pubkey', 'uptime', 'utilizationPercent', 'address', 'ip', 'status'].includes(sortColumn)
                                            ? sortColumn as 'pubkey' | 'uptime' | 'utilizationPercent' | 'address' | 'ip' | 'status'
                                            : null
                                    }
                                    sortDirection={sortDirection}
                                    onSort={(col) => setSorting(col as 'pubkey' | 'uptime')}
                                />
                            )}
                        </div>
                    </>
                )

            case 'analytics':
                return <AnalyticsTab />

            case 'leaderboard':
                return <LeaderboardTab />

            case 'directory':
                return (
                    <DirectoryTab
                        onViewNode={handleViewNode}
                        onAddToWatchlist={handleAddToWatchlist}
                        onAddToCompare={handleAddToCompare}
                    />
                )

            case 'map':
                return (
                    <div className="h-[600px]">
                        <NodeMap nodes={mapNodes} />
                    </div>
                )

            case 'watchlist':
                return (
                    <WatchlistTab
                        watchlist={watchlist}
                        onRemove={handleRemoveFromWatchlist}
                        onViewNode={handleViewNode}
                        onAddToCompare={handleAddToCompare}
                    />
                )

            case 'compare':
                return (
                    <CompareTab
                        compareList={compareList}
                        onRemove={handleRemoveFromCompare}
                    />
                )

            default:
                return null
        }
    }

    return (
        <div className="space-y-6">
            {/* Dashboard Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#00FFAA]" />
                    </div>
                    <span className="text-sm font-medium text-white">Network Overview</span>
                </div>

                <div className="flex items-center gap-3">
                    {lastUpdated && (
                        <span className="text-xs text-[#666]">
                            Updated: {lastUpdated.toLocaleTimeString()}
                        </span>
                    )}
                    <button
                        onClick={handleManualRefresh}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#252525] text-sm text-white hover:bg-[#252525] transition-colors disabled:opacity-50"
                    >
                        <RefreshCw
                            className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`}
                        />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Error State */}
            {error && (
                <div className="glass-card p-4 border-destructive flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                    <div>
                        <h3 className="font-semibold text-destructive">Error</h3>
                        <p className="text-sm text-muted-foreground mt-1">{error}</p>
                    </div>
                </div>
            )}

            {/* Tab Content */}
            {renderTabContent()}

            {/* Stats Summary */}
            <div className="text-center text-sm text-muted-foreground py-4">
                <p>
                    Showing <span className="text-accent font-semibold">{pnodes.length}</span> provider node{pnodes.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Node Detail Modal */}
            <NodeDetailModal
                pubkey={selectedNode}
                onClose={() => setSelectedNode(null)}
                onAddToWatchlist={handleAddToWatchlist}
                onAddToCompare={handleAddToCompare}
                isInWatchlist={selectedNode ? watchlist.includes(selectedNode) : false}
            />
        </div>
    )
}
