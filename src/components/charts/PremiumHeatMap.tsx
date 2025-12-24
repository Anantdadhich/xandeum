'use client'

import { useMemo } from 'react'

interface HeatMapData {
    label: string
    values: number[]
}

interface PremiumHeatMapProps {
    title: string
    description?: string
    data: HeatMapData[]
    labels?: string[]
    colorScale?: string[]
}

export function PremiumHeatMap({
    title,
    description,
    data,
    labels = ['12am', '4am', '8am', '12pm', '4pm', '8pm', '11pm'],
    // Brand teal color scale - from dark to bright
    colorScale = ['#0a1a15', '#0d2e25', '#104235', '#00705a', '#00aa88', '#00FFAA']
}: PremiumHeatMapProps) {

    const maxValue = useMemo(() => {
        return Math.max(...data.flatMap(d => d.values), 1)
    }, [data])

    const getColor = (value: number) => {
        if (value === 0) return colorScale[0]
        const ratio = value / maxValue
        const index = Math.min(Math.floor(ratio * (colorScale.length - 1)) + 1, colorScale.length - 1)
        return colorScale[index]
    }

    const totalHours = useMemo(() => {
        const total = data.reduce((sum, row) => sum + row.values.reduce((a, b) => a + b, 0), 0)
        const hours = Math.floor(total)
        const mins = Math.floor((total % 1) * 60)
        return `${hours}h ${mins}m`
    }, [data])

    return (
        <div className="glass-card p-5 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[var(--accent-subtle)]">
                        <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white">{title}</h3>
                        {description && (
                            <p className="text-[10px] text-[var(--foreground-muted)]">{description}</p>
                        )}
                    </div>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-[10px] text-[var(--foreground-muted)]">Total Hours</p>
                    <p className="text-sm font-bold text-white">{totalHours}</p>
                </div>
            </div>

            {/* Heat Map Container */}
            <div className="flex-1 min-h-0 flex flex-col justify-center overflow-hidden">
                {/* Time Labels */}
                <div className="flex mb-1 pl-10 shrink-0">
                    {labels.map((label, index) => (
                        <div key={`${label}-${index}`} className="flex-1 text-center text-[9px] text-[var(--foreground-muted)]">
                            {label}
                        </div>
                    ))}
                </div>

                {/* Grid - wrapped in overflow container */}
                <div className="flex-1 min-h-0 overflow-hidden">
                    <div className="space-y-1">
                        {data.slice(0, 6).map((row, rowIndex) => (
                            <div key={row.label} className="flex items-center gap-1">
                                <span className="text-[10px] text-[var(--foreground-muted)] w-8 text-right pr-1 shrink-0">
                                    {row.label}
                                </span>
                                <div className="flex-1 flex gap-1">
                                    {row.values.slice(0, labels.length).map((value, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className="flex-1 aspect-square rounded transition-all duration-200 hover:scale-110 hover:z-10 cursor-pointer"
                                            style={{
                                                backgroundColor: getColor(value),
                                                boxShadow: value > maxValue * 0.6
                                                    ? `0 0 8px ${colorScale[colorScale.length - 1]}80`
                                                    : 'none',
                                                maxWidth: '28px',
                                                maxHeight: '28px'
                                            }}
                                            title={`${row.label}, ${labels[colIndex]}: ${value}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Color Scale Legend */}
                <div className="mt-2 flex items-center justify-center gap-2 shrink-0">
                    <span className="text-[9px] text-[var(--foreground-muted)]">Less</span>
                    <div className="flex gap-0.5">
                        {colorScale.map((color, index) => (
                            <div
                                key={index}
                                className="w-2.5 h-2.5 rounded-sm"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] text-[var(--foreground-muted)]">More</span>
                </div>
            </div>
        </div>
    )
}
