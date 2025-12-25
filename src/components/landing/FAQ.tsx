'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'
import { ScrollReveal, scrollAnimationStyles } from './ScrollAnimation'

const faqs = [
    {
        question: 'What is Xandeum?',
        answer: 'Xandeum is building a revolutionary decentralized storage solution for the Solana blockchain. Our scalable, secure, and smart contract-native platform empowers developers to build innovative web3 applications with storage capacity scaling to exabytes and beyond.',
    },
    {
        question: 'How does liquid staking work?',
        answer: 'When you stake SOL with Xandeum, you receive xandSOL tokens that represent your staked position. Your SOL is delegated to our curated validators, and you continue earning staking rewards while your xandSOL remains liquid and usable in DeFi protocols.',
    },
    {
        question: 'What are pNodes?',
        answer: 'pNodes (Provider Nodes) are the backbone of Xandeum\'s decentralized storage network. They are operated by community members who provide storage capacity to the network and earn rewards for their contributions.',
    },
    {
        question: 'What is xandSOL?',
        answer: 'xandSOL is Xandeum\'s liquid staking token. When you stake SOL, you receive xandSOL which increases in value over time as staking and storage rewards accumulate. You can use xandSOL in DeFi while still earning rewards.',
    },
    {
        question: 'How do I earn XAND tokens?',
        answer: 'XAND governance tokens are earned as additional rewards when you stake SOL with the Xandeum pool. These tokens give you voting rights in the Xandeum DAO and can be used to participate in governance decisions.',
    },
    {
        question: 'Is my staked SOL secure?',
        answer: 'Yes, your staked SOL is protected by YieldDefender, our security mechanism that ensures validators return rewards to the pool. The protocol is audited and secured by Solana\'s robust proof-of-stake consensus.',
    },
    {
        question: 'What makes Xandeum different?',
        answer: 'Xandeum solves the blockchain storage trilemma by offering: 1) Scalability to exabytes+, 2) Smart contract native integration with Solana, and 3) Random access to data (not just file-level access).',
    },
    {
        question: 'What is the minimum to stake?',
        answer: 'There is no minimum amount to stake SOL with Xandeum. You can start with any amount and begin earning rewards immediately. Your xandSOL tokens are automatically minted when you stake.',
    },
]

// Smooth accordion panel component with improved close animation
function AccordionPanel({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (contentRef.current) {
            setIsAnimating(true)
            if (isOpen) {
                // Opening - set to actual height
                setHeight(contentRef.current.scrollHeight)
            } else {
                // Closing - animate to 0
                setHeight(0)
            }
            // Clear animating state after transition
            const timer = setTimeout(() => setIsAnimating(false), 400)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    return (
        <div
            style={{
                height: height,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-4px)',
            }}
            className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        >
            <div ref={contentRef} className="pb-5">
                {children}
            </div>
        </div>
    )
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    // Split FAQs into two columns
    const leftColumn = faqs.filter((_, i) => i % 2 === 0)
    const rightColumn = faqs.filter((_, i) => i % 2 === 1)

    const FAQItem = ({ faq, index, delay }: { faq: typeof faqs[0]; index: number; delay: number }) => {
        const isOpen = openIndex === index
        return (
            <div
                className="group/item relative"
                style={{ animationDelay: `${delay * 50}ms` }}
            >
                {/* Subtle background glow on hover */}
                <div className={`
                    absolute inset-0 -mx-4 rounded-xl transition-all duration-300
                    ${isOpen
                        ? 'bg-gradient-to-r from-[#00FFAA]/[0.03] to-transparent'
                        : 'bg-transparent group-hover/item:bg-white/[0.02]'
                    }
                `} />

                <div className="relative border-t border-white/[0.08] group-first/item:border-t-0">
                    <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between py-5 text-left group/btn"
                    >
                        <span className={`
                            text-[15px] font-medium pr-4 transition-all duration-300
                            ${isOpen
                                ? 'text-[#00FFAA]'
                                : 'text-white group-hover/btn:text-[#00FFAA]'
                            }
                        `}>
                            {faq.question}
                        </span>
                        <div className={`
                            relative w-8 h-8 rounded-full flex items-center justify-center shrink-0
                            transition-all duration-300
                            ${isOpen
                                ? 'bg-[#00FFAA]/10 rotate-0'
                                : 'bg-white/[0.05] group-hover/btn:bg-[#00FFAA]/10 rotate-0'
                            }
                        `}>
                            <div className={`
                                transition-transform duration-300 ease-out
                                ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
                            `}>
                                {isOpen ? (
                                    <Minus className="w-4 h-4 text-[#00FFAA]" strokeWidth={2} />
                                ) : (
                                    <Plus className="w-4 h-4 text-[#888] group-hover/btn:text-[#00FFAA] transition-colors" strokeWidth={2} />
                                )}
                            </div>
                        </div>
                    </button>
                    <AccordionPanel isOpen={isOpen}>
                        <p className="text-[14px] text-[#888] leading-[1.7] pr-10">
                            {faq.answer}
                        </p>
                    </AccordionPanel>
                </div>
            </div>
        )
    }

    return (
        <section id="faq" className="relative py-32 overflow-hidden">
            {/* Inject scroll animation styles */}
            <style dangerouslySetInnerHTML={{ __html: scrollAnimationStyles }} />

            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle gradient orb */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00FFAA]/[0.02] rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00A3FF]/[0.02] rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left Column - Header */}
                    <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
                        <div className="space-y-6">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFAA] animate-pulse" />
                                <span className="text-xs font-medium text-[#888] uppercase tracking-wider">FAQ</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                                Your Questions,
                                <br />
                                <span className="bg-gradient-to-r from-white via-white to-[#888] bg-clip-text text-transparent">
                                    Answered
                                </span>
                            </h2>

                            <p className="text-[#777] text-base leading-relaxed max-w-sm">
                                Find everything you need to know about Xandeum, from staking to storage solutions.
                            </p>

                            <a
                                href="https://xandsol.xandeum.network/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 mt-2"
                            >
                                <span className="text-[#00FFAA] font-medium text-sm group-hover:underline underline-offset-4 transition-all">
                                    Start staking now
                                </span>
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#00FFAA]/10 group-hover:bg-[#00FFAA]/20 transition-all">
                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#00FFAA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                                </div>
                            </a>
                        </div>
                    </ScrollReveal>

                    {/* Right Column - FAQ Grid */}
                    <ScrollReveal className="lg:col-span-8" delay={200}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-12">
                            {/* Left FAQ Column */}
                            <div className="space-y-0">
                                {leftColumn.map((faq, i) => (
                                    <FAQItem key={i * 2} faq={faq} index={i * 2} delay={i} />
                                ))}
                            </div>
                            {/* Right FAQ Column */}
                            <div className="space-y-0 md:mt-0 mt-0">
                                {rightColumn.map((faq, i) => (
                                    <FAQItem key={i * 2 + 1} faq={faq} index={i * 2 + 1} delay={i + leftColumn.length} />
                                ))}
                            </div>
                        </div>

                        {/* Bottom decoration line */}
                        <div className="mt-8 pt-8 border-t border-white/[0.08]">
                            <p className="text-sm text-[#555]">
                                Still have questions?{' '}
                                <a href="mailto:support@xandeum.com" className="text-[#00FFAA] hover:underline underline-offset-4">
                                    Contact our team
                                </a>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
