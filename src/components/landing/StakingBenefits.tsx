'use client'

import { Coins, TrendingUp, Wallet, ArrowUpRight } from 'lucide-react'

const benefits = [
    {
        icon: Coins,
        title: 'Storage Fee Rewards',
        description: 'Storage-enabled dApps pay storage fees in SOL, which flow directly to stakers.',
        gradient: 'from-emerald-500/20 via-emerald-900/10 to-transparent',
        accentColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/20',
    },
    {
        icon: TrendingUp,
        title: 'Enhanced Validator Rewards',
        description: 'Xandeum Liquid Staking captures rewards by delegating to Xandeum-enabled validators.',
        gradient: 'from-cyan-500/20 via-cyan-900/10 to-transparent',
        accentColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/20',
    },
    {
        icon: Wallet,
        title: 'Direct to Your Wallet',
        description: 'When staking with us, storage rewards arrive directly in your wallet automatically.',
        gradient: 'from-purple-500/20 via-purple-900/10 to-transparent',
        accentColor: 'text-purple-400',
        iconBg: 'bg-purple-500/20',
    },
]

export function StakingBenefits() {
    return (
        <section id="staking" className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(0,255,170,0.05)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Two-column layout */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                    {/* Left content */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-32">
                            {/* Label with dot */}
                            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                                <span className="w-2 h-2 rounded-full bg-[#00FFAA]"></span>
                                <span className="text-[12px] font-medium tracking-wider text-[#00FFAA] uppercase">
                                    Staking Benefits
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                                Earn More With<br />
                                <span className="text-[#666]">Xandeum</span>
                            </h2>

                            <p className="text-[#777] text-lg leading-relaxed mb-8 max-w-md">
                                Liquid staking with Xandeum unlocks unique benefits. Beyond traditional staking rewards, you earn from the entire storage ecosystem.
                            </p>

                            {/* CTA Link */}
                            <a
                                href="https://xandsol.xandeum.network/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#00FFAA] font-medium text-sm hover:underline"
                            >
                                Start earning now
                                <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                            </a>
                        </div>
                    </div>

                    {/* Right content - Benefits Cards + APY Card */}
                    <div className="lg:col-span-7 space-y-5">
                        {/* Benefit Cards */}
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <div
                                    key={benefit.title}
                                    className="group relative rounded-3xl overflow-hidden"
                                    style={{
                                        position: 'sticky',
                                        top: `${128 + index * 20}px`,
                                    }}
                                >
                                    {/* Card background with gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient}`}></div>

                                    {/* Grid pattern overlay */}
                                    <div
                                        className="absolute inset-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '32px 32px',
                                        }}
                                    ></div>

                                    {/* Card content */}
                                    <div className="relative p-6 bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.08] rounded-3xl">
                                        <div className="flex items-start gap-5">
                                            {/* Icon */}
                                            <div className={`shrink-0 w-14 h-14 rounded-2xl ${benefit.iconBg} flex items-center justify-center`}>
                                                <Icon className={`w-6 h-6 ${benefit.accentColor}`} strokeWidth={1.5} />
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                                    {benefit.title}
                                                </h3>
                                                <p className="text-[15px] text-[#888] leading-relaxed">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {/* APY Card */}
                        <div
                            className="group relative rounded-3xl overflow-hidden"
                            style={{
                                position: 'sticky',
                                top: `${128 + benefits.length * 20}px`,
                            }}
                        >
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00FFAA]/20 via-[#00FFAA]/5 to-transparent"></div>

                            {/* Grid pattern overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                    backgroundSize: '32px 32px',
                                }}
                            ></div>

                            {/* Card content */}
                            <div className="relative p-8 bg-[#0a0a0a]/80 backdrop-blur-sm border border-[#00FFAA]/20 rounded-3xl">
                                {/* APY Display */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-[11px] font-medium tracking-wider text-[#666] uppercase mb-1">Estimated APY</div>
                                        <div className="text-5xl md:text-6xl font-bold text-[#00FFAA]">
                                            8.5%+
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[11px] font-medium tracking-wider text-[#666] uppercase mb-1">Including</div>
                                        <div className="text-[15px] text-[#888]">Storage rewards</div>
                                    </div>
                                </div>

                                {/* Token badges */}
                                <div className="flex gap-3 mb-6">
                                    <div className="flex-1 text-center py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                        <div className="text-lg font-bold text-white mb-0.5">xandSOL</div>
                                        <div className="text-[11px] text-[#666] uppercase tracking-wider">Liquid Token</div>
                                    </div>
                                    <div className="flex-1 text-center py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                                        <div className="text-lg font-bold text-white mb-0.5">XAND</div>
                                        <div className="text-[11px] text-[#666] uppercase tracking-wider">Governance</div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <a
                                    href="https://xandsol.xandeum.network/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/btn flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#00FFAA] text-black font-semibold text-base hover:bg-[#00FFAA]/90 hover:shadow-[0_0_40px_rgba(0,255,170,0.4)] transition-all duration-300"
                                >
                                    Stake Your SOL Now
                                    <svg
                                        className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
