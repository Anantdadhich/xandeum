'use client'

import { useMemo } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'

interface AreaChartData {
    label: string
    value1: number
    value2?: number
    value3?: number
}

interface PremiumAreaChartProps {
    title: string
    description?: string
    data: AreaChartData[]
    labels?: string[]
    colors?: string[]
    showGrid?: boolean
    animated?: boolean
}

export function PremiumAreaChart({
    title,
    description,
    data,
    labels = ['Primary', 'Secondary', 'Tertiary'],
    // Brand teal colors for area fills
    colors = ['#00FFAA', '#00CC88', '#009966'],
    showGrid = false,
    animated = true
}: PremiumAreaChartProps) {

    const chartData = useMemo(() => data, [data])

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
                            <span className="text-xs text-[var(--foreground-muted)]">{labels[index]}</span>
                            <span className="text-sm font-semibold text-white ml-auto">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
                {labels.slice(0, 3).map((label, index) => (
                    <div key={label + index} className="flex items-center gap-1.5">
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
                    <AreaChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                    >
                        <defs>
                            {colors.map((color, index) => (
                                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
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
                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="value1"
                            stroke={colors[0]}
                            strokeWidth={2}
                            fill={`url(#gradient-0)`}
                            animationDuration={animated ? 1500 : 0}
                        />
                        {data.some(d => d.value2 !== undefined) && (
                            <Area
                                type="monotone"
                                dataKey="value2"
                                stroke={colors[1]}
                                strokeWidth={2}
                                fill={`url(#gradient-1)`}
                                animationDuration={animated ? 1500 : 0}
                            />
                        )}
                        {data.some(d => d.value3 !== undefined) && (
                            <Area
                                type="monotone"
                                dataKey="value3"
                                stroke={colors[2]}
                                strokeWidth={2}
                                fill={`url(#gradient-2)`}
                                animationDuration={animated ? 1500 : 0}
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
