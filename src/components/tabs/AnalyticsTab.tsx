'use client'

import { useMemo } from 'react'
import { useDashboardStore } from '@/lib/store'
import { PremiumLineChart } from '@/components/charts/PremiumLineChart'
import { PremiumBarChart } from '@/components/charts/PremiumBarChart'
import { PremiumAreaChart } from '@/components/charts/PremiumAreaChart'
import { PremiumScatterChart } from '@/components/charts/PremiumScatterChart'
import { PremiumHeatMap } from '@/components/charts/PremiumHeatMap'
import { VersionDistribution } from '@/components/charts/VersionDistribution'
import { TrendingUp, BarChart2, Activity, Calendar } from 'lucide-react'

// Diverse color palette inspired by Cryps, Cryptix, and Voltra
const CHART_COLORS = {
    // Primary vibrant colors
    teal: '#00FFAA',           // Brand primary
    violet: '#7B61FF',         // Electric violet
    cyan: '#00D1FF',           // Electric cyan
    lime: '#B2FF4D',           // Lime success
    rose: '#FF2D55',           // Deep rose
    amber: '#FFB800',          // Amber gold
    lavender: '#A855F7',       // Soft lavender
    mint: '#4DEBC9',           // Soft cyan/mint

    // For bar charts - diverse multi-color
    bars: ['#00FFAA', '#7B61FF', '#00D1FF', '#B2FF4D', '#FFB800'],

    // For scatter - varied groupings
    scatter: ['#00FFAA', '#7B61FF', '#FF2D55'],

    // For area charts - gradient friendly
    areas: ['#00FFAA', '#7B61FF', '#00D1FF'],

    // For heat maps - intensity scale
    heatmap: ['#0a1a15', '#104235', '#00705a', '#00aa88', '#00FFAA', '#4DEBC9']
}

export function AnalyticsTab() {
    const { pnodes, metrics } = useDashboardStore()

    // Generate mock historical data for line chart
    const lineChartData = useMemo(() => {
        const now = new Date()
        return Array.from({ length: 12 }, (_, i) => {
            const date = new Date(now)
            date.setHours(now.getHours() - (11 - i) * 2)
            return {
                label: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                value: Math.floor(200 + Math.random() * 50 + i * 3),
                secondary: Math.floor(180 + Math.random() * 40 + i * 2)
            }
        })
    }, [])

    // Generate bar chart data for node activity by region
    const barChartData = useMemo(() => {
        const regions = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania']
        return regions.map((region, i) => ({
            label: region,
            value: Math.floor(20 + Math.random() * 80),
            color: CHART_COLORS.bars[i]
        }))
    }, [])

    // Generate area chart data for network traffic
    const areaChartData = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            label: `${10 + i * 10}`,
            value1: Math.floor(40 + Math.random() * 30 + i * 5),
            value2: Math.floor(30 + Math.random() * 25 + i * 4),
            value3: Math.floor(20 + Math.random() * 20 + i * 3)
        }))
    }, [])

    // Generate scatter chart data for performance metrics
    const scatterData = useMemo(() => {
        return Array.from({ length: 50 }, () => ({
            x: Math.floor(10 + Math.random() * 80),
            y: Math.floor(10 + Math.random() * 80),
            z: Math.floor(50 + Math.random() * 100)
        }))
    }, [])

    // Generate heat map data for activity
    const heatMapData = useMemo(() => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        return days.map(day => ({
            label: day,
            values: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))
        }))
    }, [])

    // Summary stats
    const stats = useMemo(() => {
        const totalNodes = pnodes.length
        // Calculate active nodes from healthyPercentage
        const healthyPercent = metrics?.health?.healthyPercentage || 0
        const activeNodes = Math.round((healthyPercent / 100) * totalNodes)
        const avgUptime = pnodes.reduce((sum, n) => sum + (n.uptime || 0), 0) / (pnodes.length || 1) / 86400
        return { totalNodes, activeNodes, avgUptime }
    }, [pnodes, metrics])

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-[var(--accent)]" />
                        Analytics Dashboard
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        Real-time network performance and trends
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <div className="px-3 py-1.5 rounded-lg bg-[var(--card)] border border-[var(--card-border)]">
                        <span className="text-[var(--foreground-muted)]">Total: </span>
                        <span className="font-semibold text-white">{stats.totalNodes}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent)]/30">
                        <span className="text-[var(--foreground-muted)]">Active: </span>
                        <span className="font-semibold text-[var(--accent)]">{stats.activeNodes}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[var(--foreground-muted)]">Total Nodes</span>
                        <TrendingUp className="w-4 h-4 text-[#B2FF4D]" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.totalNodes.toLocaleString()}</p>
                    <p className="text-xs text-[#B2FF4D] mt-1">+12% from last week</p>
                </div>
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[var(--foreground-muted)]">Active Now</span>
                        <Activity className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <p className="text-2xl font-bold text-[var(--accent)]">{stats.activeNodes.toLocaleString()}</p>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1">{((stats.activeNodes / stats.totalNodes) * 100).toFixed(1)}% online</p>
                </div>
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[var(--foreground-muted)]">Avg Uptime</span>
                        <Calendar className="w-4 h-4 text-[#7B61FF]" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stats.avgUptime.toFixed(1)}d</p>
                    <p className="text-xs text-[var(--foreground-muted)] mt-1">Network average</p>
                </div>
                <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[var(--foreground-muted)]">Pod Credits</span>
                        <BarChart2 className="w-4 h-4 text-[#FFB800]" />
                    </div>
                    <p className="text-2xl font-bold text-white">1.2M</p>
                    <p className="text-xs text-[#FFB800] mt-1">+5.3% this epoch</p>
                </div>
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-[350px] chart-card overflow-hidden">
                    <PremiumLineChart
                        title="Node Activity"
                        description="Track node count over time with trend analysis"
                        data={lineChartData}
                        primaryLabel="Current"
                        secondaryLabel="Previous"
                        primaryColor={CHART_COLORS.teal}
                        secondaryColor={CHART_COLORS.violet}
                    />
                </div>
                <div className="h-[350px] chart-card overflow-hidden">
                    <PremiumBarChart
                        title="Regional Distribution"
                        description="Compare node distribution across regions"
                        data={barChartData}
                        colors={CHART_COLORS.bars}
                    />
                </div>
            </div>

            {/* Secondary Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="h-[320px] chart-card overflow-hidden">
                    {metrics?.versions?.distribution && (
                        <VersionDistribution data={metrics.versions.distribution} />
                    )}
                </div>
                <div className="h-[320px] chart-card overflow-hidden">
                    <PremiumScatterChart
                        title="Performance Metrics"
                        description="CPU vs Memory utilization correlation"
                        data={scatterData}
                        xLabel="CPU"
                        yLabel="Memory"
                        colors={CHART_COLORS.scatter}
                    />
                </div>
                <div className="h-[320px] chart-card overflow-hidden">
                    <PremiumHeatMap
                        title="Activity Heat Map"
                        description="Network activity patterns"
                        data={heatMapData}
                        labels={['12am', '4am', '8am', '12pm', '4pm', '8pm', '11pm']}
                        colorScale={CHART_COLORS.heatmap}
                    />
                </div>
            </div>

            {/* Area Chart Row */}
            <div className="grid grid-cols-1 gap-4">
                <div className="h-[320px] chart-card overflow-hidden">
                    <PremiumAreaChart
                        title="Network Traffic"
                        description="Cumulative data transfer trends over time"
                        data={areaChartData}
                        labels={['Inbound', 'Outbound', 'Internal']}
                        colors={CHART_COLORS.areas}
                    />
                </div>
            </div>
        </div>
    )
}
