'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Card } from '@/components/ui/card'

interface VersionDistributionProps {
    data: Record<string, number>
}

export function VersionDistribution({ data }: VersionDistributionProps) {
    const chartData = Object.entries(data).map(([version, count]) => ({
        name: `v${version}`,
        value: count,
    })).sort((a, b) => b.value - a.value)

    const COLORS = ['#00FFAA', '#00CC88', '#008855', '#333333', '#666666']

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-2 border border-[var(--card-border)] bg-[var(--card)]/95">
                    <p className="text-sm font-semibold">{payload[0].name}</p>
                    <p className="text-xs text-[var(--accent)]">
                        {payload[0].value} nodes ({((payload[0].value / chartData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4">Version Distribution</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    style={{ filter: `drop-shadow(0 0 4px ${COLORS[index % COLORS.length]}40)` }}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value, entry: any) => <span className="text-gray-400 ml-1">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
