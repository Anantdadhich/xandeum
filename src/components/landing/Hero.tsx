'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal, scrollAnimationStyles } from './ScrollAnimation'

// Staggered animation styles
const animationStyles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in-up {
    animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
}

.animate-fade-in {
    animation: fadeIn 1s ease-out forwards;
    opacity: 0;
}
`

// Helper component for animated words
function AnimatedWord({ children, delay }: { children: React.ReactNode; delay: number }) {
    return (
        <span
            className="inline-block animate-fade-in-up"
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </span>
    )
}

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center overflow-hidden">
            {/* Inject animation styles */}
            <style dangerouslySetInnerHTML={{ __html: animationStyles + scrollAnimationStyles }} />

            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                {/* Subtle radial gradient at bottom */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,170,0.18)_0%,transparent_70%)]" />

                {/* Very subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.012]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
                {/* Main Headline - Animated word by word */}
                <h1
                    className="text-[44px] sm:text-[56px] md:text-[68px] lg:text-[82px] leading-[1.1] tracking-[-0.02em] text-white mb-8"
                    style={{
                        fontFamily: 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif',
                        fontWeight: 400
                    }}
                >
                    <AnimatedWord delay={200}>Exabytes</AnimatedWord>{' '}
                    <AnimatedWord delay={500}>for</AnimatedWord>
                    <br />
                    <AnimatedWord delay={800}>Solana</AnimatedWord>{' '}
                    <AnimatedWord delay={1100}>Programs</AnimatedWord>
                </h1>

                {/* Subheadline - Animated line by line */}
                <div
                    className="text-[15px] sm:text-[16px] md:text-[17px] text-[#888] max-w-[600px] mx-auto mb-12 leading-[1.7]"
                    style={{
                        fontFamily: 'var(--font-dm-sans), "DM Sans", system-ui, sans-serif',
                        fontWeight: 400
                    }}
                >
                    <p
                        className="animate-fade-in-up"
                        style={{ animationDelay: '1500ms' }}
                    >
                        Xandeum offers a seamless, secure experience for decentralized storage.
                    </p>
                    <p
                        className="animate-fade-in-up"
                        style={{ animationDelay: '1800ms' }}
                    >
                        Scalable to exabytes, smart contract native, and lightning fast.
                    </p>
                </div>

                {/* Single CTA Button - Animated */}
                <div
                    className="mb-16 animate-fade-in-up"
                    style={{ animationDelay: '2200ms' }}
                >
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium text-black bg-[#00FFAA] rounded-full hover:bg-[#00E699] hover:shadow-[0_0_40px_rgba(0,255,170,0.35)] transition-all duration-300"
                    >
                        Get started now
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Dashboard Preview Image with Glowing Top Border */}
            <ScrollReveal className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20" delay={2500}>
                {/* Large diffuse greenish glow ABOVE the dashboard - Cryptix style */}
                <div
                    className="absolute -top-[160px] left-[0%] right-[0%] h-[280px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse 200% 200% at 50% 100%, rgba(0, 255, 170, 0.35) 0%, rgba(0, 200, 150, 0.18) 45%, transparent 75%)',
                        filter: 'blur(70px)'
                    }}
                />

                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 25px 80px -12px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 255, 170, 0.1)'
                    }}
                >
                    {/* Glowing Top Border line - like Cryptix dashboard */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] z-10"
                        style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 170, 0.5) 15%, rgba(0, 255, 200, 1) 50%, rgba(0, 255, 170, 0.5) 85%, transparent 100%)'
                        }}
                    />

                    {/* Secondary glow inside top of card */}
                    <div
                        className="absolute top-0 left-[10%] right-[10%] h-[80px] z-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0, 255, 170, 0.15) 0%, transparent 60%)',
                            filter: 'blur(20px)'
                        }}
                    />

                    {/* Dashboard Image */}
                    <div className="relative w-full">
                        <Image
                            src="/dashboard.png"
                            alt="Xandeum Dashboard Preview"
                            width={1200}
                            height={800}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
