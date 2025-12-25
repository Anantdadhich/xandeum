'use client'

import { Activity, Database, Server, Shield, Zap, Globe } from 'lucide-react'

const stats = [
    { icon: Activity, label: 'Network Health', value: '99.9%' },
    { icon: Database, label: 'Total Storage', value: '10+ PB' },
    { icon: Shield, label: 'Uptime', value: '99.99%' },
    { icon: Zap, label: 'Avg. Latency', value: '<50ms' },
    { icon: Globe, label: 'Countries', value: '25+' },
    { icon: Server, label: 'Active pNodes', value: '100+' },
]

// Double the stats for seamless loop
const marqueeItems = [...stats, ...stats]

export function StatsMarquee() {
    return (
        <section className="relative py-16 overflow-hidden border-y border-white/5 bg-[#050505]">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            {/* Marquee container with faster motion */}
            <div className="flex animate-marquee">
                {marqueeItems.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 px-12 shrink-0"
                        >
                            {/* Circular icon container with green border - Cryps style */}
                            <div
                                className="flex items-center justify-center w-12 h-12 rounded-full"
                                style={{
                                    background: 'rgba(0, 255, 170, 0.08)',
                                    border: '1.5px solid rgba(0, 255, 170, 0.4)'
                                }}
                            >
                                <Icon className="w-5 h-5 text-[#00FFAA]" />
                            </div>
                            {/* Value on top, label below - vertical layout */}
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-[#666]">{stat.label}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
