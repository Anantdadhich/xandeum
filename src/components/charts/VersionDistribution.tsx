'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

interface VersionDistributionProps {
    data: Record<string, number>
}

// Diverse color palette for pie chart segments
const PIE_COLORS = [
    '#00FFAA',  // Teal (brand)
    '#7B61FF',  // Electric violet
    '#00D1FF',  // Electric cyan
    '#B2FF4D',  // Lime success
    '#FFB800',  // Amber gold
    '#FF2D55',  // Deep rose
    '#A855F7',  // Soft lavender
]

export function VersionDistribution({ data }: VersionDistributionProps) {
    const chartData = Object.entries(data).map(([version, count]) => ({
        name: version,
        value: count,
    })).sort((a, b) => b.value - a.value)

    // Limit to top 6 versions, group rest as "Other"
    const topVersions = chartData.slice(0, 6)
    const otherCount = chartData.slice(6).reduce((sum, item) => sum + item.value, 0)
    if (otherCount > 0) {
        topVersions.push({ name: 'Other', value: otherCount })
    }

    const total = topVersions.reduce((sum, item) => sum + item.value, 0)

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const percent = ((payload[0].value / total) * 100).toFixed(1)
            return (
                <div className="glass-card p-3 border border-[var(--card-border)] bg-[var(--card)]/95 backdrop-blur-sm">
                    <p className="text-sm font-semibold text-white">{payload[0].name}</p>
                    <p className="text-xs text-[var(--accent)] mt-1">
                        {payload[0].value.toLocaleString()} nodes ({percent}%)
                    </p>
                </div>
            )
        }
        return null
    }

    // Truncate long version names
    const truncateVersion = (name: string, maxLen: number = 12) => {
        if (name.length <= maxLen) return name
        return name.slice(0, maxLen) + '...'
    }

    return (
        <div className="glass-card p-6 h-full flex flex-col overflow-hidden">
            <h3 className="text-lg font-bold mb-2 text-white">Version Distribution</h3>
            <p className="text-xs text-[var(--foreground-muted)] mb-4">Node software versions across the network</p>

            {/* Chart */}
            <div className="flex-1 min-h-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={topVersions}
                            cx="50%"
                            cy="50%"
                            innerRadius="55%"
                            outerRadius="85%"
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {topVersions.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                                    style={{
                                        filter: index < 3 ? `drop-shadow(0 0 6px ${PIE_COLORS[index % PIE_COLORS.length]}60)` : 'none'
                                    }}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend - Scrollable if needed */}
            <div className="mt-4 max-h-[120px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                    {topVersions.slice(0, 6).map((item, index) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[var(--card)] transition-colors"
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                            />
                            <span
                                className="text-xs text-[var(--foreground-muted)] truncate flex-1"
                                title={item.name}
                            >
                                {truncateVersion(item.name)}
                            </span>
                            <span className="text-xs text-white font-medium shrink-0">
                                {((item.value / total) * 100).toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
