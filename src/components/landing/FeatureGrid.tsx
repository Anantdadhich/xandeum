'use client'

import { Database, Zap, DollarSign, Monitor } from 'lucide-react'
import { ScrollReveal, scrollAnimationStyles } from './ScrollAnimation'

const features = [
    {
        icon: Database,
        title: 'Scalable Storage',
        subtitle: 'ENTERPRISE GRADE',
        badge: 'EXABYTES',
        description: 'Your data is stored with enterprise-grade infrastructure, scaling seamlessly to exabytes without compromising performance.',
        gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
        accentColor: 'text-emerald-400',
    },
    {
        icon: Zap,
        title: 'Instant Access',
        subtitle: 'REAL-TIME',
        badge: 'ZERO LATENCY',
        description: 'Execute your data operations in real-time with sub-millisecond latency. No delays, no waiting.',
        gradient: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
        accentColor: 'text-cyan-400',
    },
    {
        icon: DollarSign,
        title: 'Optimized Costs',
        subtitle: 'COST EFFICIENT',
        badge: '90% SAVINGS',
        description: 'Benefit from some of the lowest storage costs on the market. Pay only for what you use.',
        gradient: 'from-amber-500/20 via-amber-900/10 to-transparent',
        accentColor: 'text-amber-400',
    },
    {
        icon: Monitor,
        title: 'Premium Interface',
        subtitle: 'USER FOCUSED',
        badge: 'INTUITIVE',
        description: 'An elegant, intuitive design that makes complex operations feel simple and accessible to everyone.',
        gradient: 'from-purple-500/20 via-purple-900/10 to-transparent',
        accentColor: 'text-purple-400',
    },
]

export function FeatureGrid() {
    return (
        <section id="features" className="relative py-24 overflow-hidden">
            {/* Inject scroll animation styles */}
            <style dangerouslySetInnerHTML={{ __html: scrollAnimationStyles }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header - Centered at top */}
                <ScrollReveal className="text-center mb-16">
                    {/* Small label with dot */}
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        <span className="w-2 h-2 rounded-full bg-[#00FFAA]"></span>
                        <span className="text-[12px] font-medium tracking-wider text-[#00FFAA] uppercase">
                            Why Xandeum?
                        </span>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        The future of<br />
                        <span className="text-[#666]">on-chain storage</span>
                    </h2>

                    {/* Subheading */}
                    <p className="text-[#777] text-lg leading-relaxed max-w-2xl mx-auto">
                        Unlock limitless possibilities with exabyte-scale storage designed specifically for Solana programs.
                    </p>
                </ScrollReveal>

                {/* Horizontal Grid - 2x2 on medium, 4 columns on large */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <ScrollReveal
                                key={feature.title}
                                delay={index * 150}
                            >
                                <div
                                    className="group relative rounded-3xl overflow-hidden h-full"
                                >
                                    {/* Card background with gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}></div>

                                    {/* Subtle grid pattern overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '32px 32px',
                                        }}
                                    ></div>

                                    {/* Card content */}
                                    <div className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.08] rounded-3xl h-full">
                                        {/* Card header */}
                                        <div className="flex items-center justify-between mb-5">
                                            <span className="text-[10px] font-medium tracking-wider text-[#666] uppercase">
                                                {feature.subtitle}
                                            </span>
                                            <span className={`text-[10px] font-medium tracking-wider ${feature.accentColor} uppercase flex items-center gap-1`}>
                                                {feature.badge}
                                                <Icon className="w-3 h-3" strokeWidth={2} />
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[14px] text-[#888] leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
