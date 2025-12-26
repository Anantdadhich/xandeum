'use client'

import { useMemo } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine
} from 'recharts'

interface LineChartData {
    label: string
    value: number
    secondary?: number
}

interface PremiumLineChartProps {
    title: string
    description?: string
    data: LineChartData[]
    primaryLabel?: string
    secondaryLabel?: string
    primaryColor?: string
    secondaryColor?: string
    showGrid?: boolean
    animated?: boolean
}

export function PremiumLineChart({
    title,
    description,
    data,
    primaryLabel = 'Value',
    secondaryLabel = 'Previous',
    primaryColor = '#00FFAA',
    secondaryColor = '#6366f1',
    showGrid = true,
    animated = true
}: PremiumLineChartProps) {

    const chartData = useMemo(() => data, [data])

    const maxValue = useMemo(() => {
        const max = Math.max(...data.map(d => Math.max(d.value, d.secondary || 0)))
        return Math.ceil(max * 1.1)
    }, [data])

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-md">
                    <p className="text-xs text-[var(--foreground-muted)] mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm font-semibold text-white">
                                {entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="glass-card p-6 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-md bg-[var(--accent-subtle)]">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <h3 className="text-base font-bold text-white">{title}</h3>
                </div>
                {description && (
                    <p className="text-xs text-[var(--foreground-muted)]">{description}</p>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                    <span className="text-xs text-[var(--foreground-muted)]">{primaryLabel}</span>
                </div>
                {data.some(d => d.secondary !== undefined) && (
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryColor }} />
                        <span className="text-xs text-[var(--foreground-muted)]">{secondaryLabel}</span>
                    </div>
                )}
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
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
                            domain={[0, maxValue]}
                        />
                        <Tooltip content={<CustomTooltip />} />

                        {data.some(d => d.secondary !== undefined) && (
                            <Line
                                type="monotone"
                                dataKey="secondary"
                                stroke={secondaryColor}
                                strokeWidth={2}
                                dot={false}
                                strokeOpacity={0.5}
                                animationDuration={animated ? 1500 : 0}
                            />
                        )}

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={primaryColor}
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 4, fill: primaryColor, stroke: '#000', strokeWidth: 2 }}
                            animationDuration={animated ? 1500 : 0}
                            style={{ filter: `drop-shadow(0 0 10px ${primaryColor}80)` }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
