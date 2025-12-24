'use client'

import { useMemo } from 'react'
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ZAxis
} from 'recharts'

interface ScatterData {
    x: number
    y: number
    z?: number
    label?: string
}

interface PremiumScatterChartProps {
    title: string
    description?: string
    data: ScatterData[]
    colors?: string[]
    xLabel?: string
    yLabel?: string
    showGrid?: boolean
    animated?: boolean
}

export function PremiumScatterChart({
    title,
    description,
    data,
    // Brand teal colors for scatter groups
    colors = ['#00FFAA', '#00CC88', '#009966'],
    xLabel = 'X Axis',
    yLabel = 'Y Axis',
    showGrid = true,
    animated = true
}: PremiumScatterChartProps) {

    const chartData = useMemo(() => data, [data])

    // Split data into groups for different colors
    const dataGroups = useMemo(() => {
        const third = Math.ceil(data.length / 3)
        return [
            data.slice(0, third),
            data.slice(third, third * 2),
            data.slice(third * 2)
        ]
    }, [data])

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 border border-[var(--card-border)] bg-[var(--background)]/95 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-[10px] text-[var(--foreground-muted)] uppercase">{xLabel}</p>
                            <p className="text-sm font-bold text-white">{payload[0].payload.x}</p>
                        </div>
                        <div>
                            <p className="text-[10px] text-[var(--foreground-muted)] uppercase">{yLabel}</p>
                            <p className="text-sm font-bold text-white">{payload[0].payload.y}</p>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }

    const labels = [`${xLabel} Low`, `${xLabel} Mid`, `${xLabel} High`]

    return (
        <div className="glass-card p-6 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-md bg-[var(--accent-subtle)]">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
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
                {labels.map((label, index) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-xs text-[var(--foreground-muted)]">{label}</span>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 5, right: 5, left: -20, bottom: 20 }}>
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.05)"
                            />
                        )}
                        <XAxis
                            type="number"
                            dataKey="x"
                            name={xLabel}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name={yLabel}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                        />
                        <ZAxis type="number" dataKey="z" range={[40, 200]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />

                        {dataGroups.map((group, index) => (
                            <Scatter
                                key={index}
                                data={group}
                                fill={colors[index % colors.length]}
                                fillOpacity={0.7}
                                animationDuration={animated ? 1500 : 0}
                            />
                        ))}
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
