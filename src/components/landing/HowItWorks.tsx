'use client'

import { Wallet, Users, Shield, TrendingUp, Coins, Award } from 'lucide-react'

const steps = [
    {
        number: '01',
        icon: Wallet,
        title: 'Stake SOL with Xandeum Pool',
        description: 'Stake your SOL and receive xandSOL tokens in return.',
        subtitle: 'DEPOSIT',
        badge: 'START',
        gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
        accentColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/20',
        iconColor: 'text-emerald-400',
    },
    {
        number: '02',
        icon: Users,
        title: 'Delegation to Validators',
        description: 'Your SOL is delegated to our curated list of top validators.',
        subtitle: 'DELEGATE',
        badge: 'AUTOMATED',
        gradient: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
        accentColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/20',
        iconColor: 'text-cyan-400',
    },
    {
        number: '03',
        icon: Shield,
        title: 'YieldDefender Protection',
        description: 'Validators return rewards to the pool, ensured by YieldDefender.',
        subtitle: 'SECURE',
        badge: 'PROTECTED',
        gradient: 'from-purple-500/20 via-purple-900/10 to-transparent',
        accentColor: 'text-purple-400',
        iconBg: 'bg-purple-500/20',
        iconColor: 'text-purple-400',
    },
    {
        number: '04',
        icon: TrendingUp,
        title: 'Automatic Compounding',
        description: 'Rewards automatically compound, increasing your APY.',
        subtitle: 'COMPOUND',
        badge: 'AUTO',
        gradient: 'from-pink-500/20 via-pink-900/10 to-transparent',
        accentColor: 'text-pink-400',
        iconBg: 'bg-pink-500/20',
        iconColor: 'text-pink-400',
    },
    {
        number: '05',
        icon: Coins,
        title: 'xandSOL Value Grows',
        description: 'Your xandSOL increases in value thanks to reward sharing.',
        subtitle: 'GROW',
        badge: 'REWARDS',
        gradient: 'from-amber-500/20 via-amber-900/10 to-transparent',
        accentColor: 'text-amber-400',
        iconBg: 'bg-amber-500/20',
        iconColor: 'text-amber-400',
    },
    {
        number: '06',
        icon: Award,
        title: 'Earn XAND Tokens',
        description: 'Receive XAND governance tokens as an additional reward.',
        subtitle: 'BONUS',
        badge: 'GOVERNANCE',
        gradient: 'from-green-500/20 via-green-900/10 to-transparent',
        accentColor: 'text-green-400',
        iconBg: 'bg-green-500/20',
        iconColor: 'text-green-400',
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,255,170,0.05)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    {/* Small label with dot */}
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        <span className="w-2 h-2 rounded-full bg-[#00FFAA]"></span>
                        <span className="text-[12px] font-medium tracking-wider text-[#00FFAA] uppercase">
                            How It Works
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        How Liquid Staking{' '}
                        <span className="text-[#666]">Works</span>
                    </h2>
                    <p className="text-[#777] text-lg leading-relaxed max-w-2xl mx-auto">
                        A simple, fast, and secure platform to maximize your staking rewards in just a few steps.
                    </p>
                </div>

                {/* Steps Grid - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {steps.map((step) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.number}
                                className="group relative rounded-3xl overflow-hidden"
                            >
                                {/* Card background with gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient}`}></div>

                                {/* Subtle grid pattern overlay */}
                                <div
                                    className="absolute inset-0 opacity-[0.03]"
                                    style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                        backgroundSize: '32px 32px',
                                    }}
                                ></div>

                                {/* Large step number watermark */}
                                <div
                                    className={`absolute -top-4 -left-2 text-[120px] font-bold opacity-[0.04] ${step.accentColor}`}
                                    style={{ lineHeight: 1 }}
                                >
                                    {step.number}
                                </div>

                                {/* Card content */}
                                <div className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.08] rounded-3xl h-full">
                                    {/* Card header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[10px] font-medium tracking-wider text-[#666] uppercase">
                                            {step.subtitle}
                                        </span>
                                        <span className={`text-[10px] font-medium tracking-wider ${step.accentColor} uppercase`}>
                                            {step.badge}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`inline-flex p-3 rounded-2xl mb-5 ${step.iconBg}`}
                                    >
                                        <Icon className={`w-6 h-6 ${step.iconColor}`} strokeWidth={1.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[14px] text-[#888] leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="https://xandsol.xandeum.network/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00FFAA] text-black font-semibold text-base hover:bg-[#00FFAA]/90 hover:shadow-[0_0_40px_rgba(0,255,170,0.4)] transition-all duration-300"
                    >
                        Start Staking Now
                        <svg
                            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
