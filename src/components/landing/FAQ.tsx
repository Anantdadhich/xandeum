'use client'

import { useState } from 'react'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'

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

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    // Split FAQs into two columns
    const leftColumn = faqs.filter((_, i) => i % 2 === 0)
    const rightColumn = faqs.filter((_, i) => i % 2 === 1)

    const FAQItem = ({ faq, index }: { faq: typeof faqs[0]; index: number }) => {
        const isOpen = openIndex === index
        return (
            <div className="border-t border-white/[0.08]">
                <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left group"
                >
                    <span className="text-[15px] font-medium text-white group-hover:text-[#00FFAA] transition-colors pr-4">
                        {faq.question}
                    </span>
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-[#00FFAA] shrink-0" strokeWidth={1.5} />
                    ) : (
                        <Plus className="w-5 h-5 text-[#666] group-hover:text-[#00FFAA] shrink-0 transition-colors" strokeWidth={1.5} />
                    )}
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                        }`}
                >
                    <p className="text-[14px] text-[#888] leading-relaxed pr-8">
                        {faq.answer}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <section id="faq" className="relative py-32 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column - Header */}
                    <div className="lg:col-span-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                            Your Questions,<br />
                            Answered
                        </h2>
                        <p className="text-[#777] text-base leading-relaxed mb-6">
                            Find everything you need to know about Xandeum, from staking to storage solutions.
                        </p>
                        <a
                            href="https://xandsol.xandeum.network/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#00FFAA] font-medium text-sm hover:underline"
                        >
                            Start staking now
                            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                        </a>
                    </div>

                    {/* Right Column - FAQ Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            {/* Left FAQ Column */}
                            <div>
                                {leftColumn.map((faq, i) => (
                                    <FAQItem key={i * 2} faq={faq} index={i * 2} />
                                ))}
                            </div>
                            {/* Right FAQ Column */}
                            <div>
                                {rightColumn.map((faq, i) => (
                                    <FAQItem key={i * 2 + 1} faq={faq} index={i * 2 + 1} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
