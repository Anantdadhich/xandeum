'use client'

import { useMemo } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts'

interface BarChartData {
    label: string
    value: number
    color?: string
}

interface PremiumBarChartProps {
    title: string
    description?: string
    data: BarChartData[]
    colors?: string[]
    showGrid?: boolean
    animated?: boolean
    vertical?: boolean
}

export function PremiumBarChart({
    title,
    description,
    data,
    // Brand teal colors - gradient from bright to dark
    colors = ['#00FFAA', '#00E699', '#00CC88', '#00B377', '#009966'],
    showGrid = false,
    animated = true,
    vertical = true
}: PremiumBarChartProps) {

    const chartData = useMemo(() => data, [data])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-md">
                    <p className="text-xs text-[var(--foreground-muted)] mb-1">{label}</p>
                    <p className="text-sm font-bold text-white">
                        {payload[0].value.toLocaleString()}
                    </p>
                </div>
            )
        }
        return null
    }

    // Get unique labels for legend
    const uniqueLabels = useMemo(() => {
        const labelSet = new Set(data.map(d => d.label))
        return Array.from(labelSet).slice(0, 5)
    }, [data])

    return (
        <div className="glass-card p-6 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-md bg-[var(--accent-subtle)]">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                </div>
                {description && (
                    <p className="text-xs text-[var(--foreground-muted)]">{description}</p>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mb-4 overflow-x-auto">
                {uniqueLabels.map((label, index) => (
                    <div key={label} className="flex items-center gap-1.5 shrink-0">
                        <div
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-xs text-[var(--foreground-muted)]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                        barCategoryGap="20%"
                    >
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.05)"
                                vertical={false}
                            />
                        )}
                        <XAxis
                            dataKey="label"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            animationDuration={animated ? 1200 : 0}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color || colors[index % colors.length]}
                                    style={{ filter: `drop-shadow(0 4px 12px ${entry.color || colors[index % colors.length]}40)` }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
