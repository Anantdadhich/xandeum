'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function HealthTrend() {
    // Mock data to simulate 24h history until backend supports time-series
    const data = [
        { time: '00:00', score: 88 },
        { time: '04:00', score: 85 },
        { time: '08:00', score: 92 },
        { time: '12:00', score: 90 },
        { time: '16:00', score: 94 },
        { time: '20:00', score: 91 },
        { time: 'Now', score: 93 },
    ]

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-2 border border-[var(--card-border)] bg-[var(--card)]/95">
                    <p className="text-sm font-semibold text-[var(--foreground-muted)]">{label}</p>
                    <p className="text-sm font-bold text-[var(--accent)]">
                        Score: {payload[0].value}%
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-4">Network Health Trend</h3>
            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FFAA" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00FFAA" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="time"
                            stroke="#666"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#666"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            domain={[60, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#00FFAA"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
