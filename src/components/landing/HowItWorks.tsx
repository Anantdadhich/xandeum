'use client'

import { Wallet, Users, Shield, TrendingUp, Coins, Award } from 'lucide-react'
import { ScrollReveal, scrollAnimationStyles } from './ScrollAnimation'

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
            {/* Inject scroll animation styles */}
            <style dangerouslySetInnerHTML={{ __html: scrollAnimationStyles }} />

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,255,170,0.05)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <ScrollReveal className="text-center mb-16">
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
                </ScrollReveal>

                {/* Steps Grid - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <ScrollReveal
                                key={step.number}
                                delay={index * 120}
                            >
                                <div
                                    className="group relative rounded-3xl overflow-hidden h-full transition-all duration-500 hover:scale-[1.02]"
                                >
                                    {/* Animated glow effect on hover */}
                                    <div
                                        className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${step.accentColor === 'text-emerald-400' ? 'rgba(52,211,153,0.3)' :
                                                step.accentColor === 'text-cyan-400' ? 'rgba(34,211,238,0.3)' :
                                                    step.accentColor === 'text-purple-400' ? 'rgba(192,132,252,0.3)' :
                                                        step.accentColor === 'text-pink-400' ? 'rgba(244,114,182,0.3)' :
                                                            step.accentColor === 'text-amber-400' ? 'rgba(251,191,36,0.3)' :
                                                                'rgba(74,222,128,0.3)'} 0%, transparent 70%)`
                                        }}
                                    />

                                    {/* Card background with gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} transition-opacity duration-300`}></div>

                                    {/* Subtle grid pattern overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '24px 24px',
                                        }}
                                    ></div>

                                    {/* Large step number watermark */}
                                    <div
                                        className={`absolute -top-6 -left-3 text-[140px] font-bold opacity-[0.03] group-hover:opacity-[0.06] ${step.accentColor} transition-opacity duration-500`}
                                        style={{ lineHeight: 1, fontFamily: 'system-ui' }}
                                    >
                                        {step.number}
                                    </div>

                                    {/* Card content */}
                                    <div className="relative p-7 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/[0.06] group-hover:border-white/[0.12] rounded-3xl h-full transition-all duration-300">
                                        {/* Top glow line */}
                                        <div
                                            className={`absolute top-0 left-1/4 right-1/4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                            style={{
                                                background: `linear-gradient(90deg, transparent, ${step.accentColor === 'text-emerald-400' ? 'rgba(52,211,153,0.5)' :
                                                    step.accentColor === 'text-cyan-400' ? 'rgba(34,211,238,0.5)' :
                                                        step.accentColor === 'text-purple-400' ? 'rgba(192,132,252,0.5)' :
                                                            step.accentColor === 'text-pink-400' ? 'rgba(244,114,182,0.5)' :
                                                                step.accentColor === 'text-amber-400' ? 'rgba(251,191,36,0.5)' :
                                                                    'rgba(74,222,128,0.5)'}, transparent)`
                                            }}
                                        />

                                        {/* Card header */}
                                        <div className="flex items-center justify-between mb-8">
                                            <span className="text-[10px] font-medium tracking-[0.15em] text-[#555] uppercase">
                                                {step.subtitle}
                                            </span>
                                            <span className={`text-[10px] font-semibold tracking-[0.12em] ${step.accentColor} uppercase flex items-center gap-1.5`}>
                                                <span className="w-1 h-1 rounded-full bg-current opacity-60" />
                                                {step.badge}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-white/95 transition-colors">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[14px] text-[#777] leading-[1.7] group-hover:text-[#888] transition-colors">
                                            {step.description}
                                        </p>

                                        {/* Bottom corner accent */}
                                        <div
                                            className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background: `radial-gradient(circle at 100% 100%, ${step.accentColor === 'text-emerald-400' ? 'rgba(52,211,153,0.08)' :
                                                    step.accentColor === 'text-cyan-400' ? 'rgba(34,211,238,0.08)' :
                                                        step.accentColor === 'text-purple-400' ? 'rgba(192,132,252,0.08)' :
                                                            step.accentColor === 'text-pink-400' ? 'rgba(244,114,182,0.08)' :
                                                                step.accentColor === 'text-amber-400' ? 'rgba(251,191,36,0.08)' :
                                                                    'rgba(74,222,128,0.08)'} 0%, transparent 70%)`
                                            }}
                                        />
                                    </div>
                                </div>
                            </ScrollReveal>
                        )
                    })}
                </div>

                {/* CTA */}
                <ScrollReveal className="text-center mt-12" delay={800}>
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
                </ScrollReveal>
            </div>
        </section >
    )
}
