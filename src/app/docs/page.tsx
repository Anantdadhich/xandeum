'use client'

import Link from 'next/link'
import {
    FileText,
    Code,
    Server,
    BookOpen,
    ArrowRight,
    ExternalLink,
    Layers,
    Zap,
    Shield
} from 'lucide-react'

const docSections = [
    {
        title: 'Architecture',
        description: 'Learn about Xandeum network architecture and how pNodes work together.',
        icon: Layers,
        href: '/docs/architecture',
        color: 'text-[var(--accent)]',
        bgColor: 'bg-[var(--accent-subtle)]',
    },
    {
        title: 'pNodes Guide',
        description: 'Complete guide to running and maintaining Provider Nodes.',
        icon: Server,
        href: '/docs/pnodes',
        color: 'text-purple-400',
        bgColor: 'bg-purple-500/20',
    },
    {
        title: 'API Reference',
        description: 'REST API documentation for accessing network data programmatically.',
        icon: Code,
        href: '/docs/api',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
    },
    {
        title: 'DeFi Integration',
        description: 'Integrate with Xandeum DeFi features like staking and swaps.',
        icon: Zap,
        href: '/docs/defi',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
    },
]

const quickLinks = [
    { title: 'Getting Started', href: '/docs/architecture', icon: BookOpen },
    { title: 'Run a pNode', href: '/docs/pnodes', icon: Server },
    { title: 'API Endpoints', href: '/docs/api', icon: Code },
]

export default function DocsPage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container-main space-y-12">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-subtle)] flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8 text-[var(--accent)]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Documentation
                    </h1>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        Everything you need to know about the Xandeum network, Provider Nodes,
                        and integrating with our APIs.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-4">
                    {quickLinks.map((link) => {
                        const Icon = link.icon
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--foreground-muted)] hover:text-white transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                                {link.title}
                            </Link>
                        )
                    })}
                </div>

                {/* Main Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {docSections.map((section) => {
                        const Icon = section.icon
                        return (
                            <Link
                                key={section.href}
                                href={section.href}
                                className="glass-card p-6 group hover:border-[var(--accent)] transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${section.bgColor} flex items-center justify-center shrink-0`}>
                                        <Icon className={`w-6 h-6 ${section.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                            {section.title}
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                                        </h3>
                                        <p className="text-sm text-[var(--foreground-muted)]">
                                            {section.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Overview Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">What is Xandeum?</h2>

                        <div className="prose prose-invert max-w-none space-y-4">
                            <p className="text-[var(--foreground-muted)]">
                                Xandeum is a decentralized storage network built on Solana. It provides
                                a scalable, permanent storage layer that integrates seamlessly with
                                the Solana blockchain.
                            </p>

                            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Key Features</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--background)]">
                                    <Server className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">Provider Nodes (pNodes)</h4>
                                        <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                            Distributed network of storage providers ensuring data availability.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--background)]">
                                    <Zap className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">High Performance</h4>
                                        <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                            Optimized for speed with low latency data retrieval.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--background)]">
                                    <Shield className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">Secure & Reliable</h4>
                                        <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                            Data redundancy and cryptographic verification built-in.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-[var(--background)]">
                                    <Layers className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-medium text-white">DeFi Integration</h4>
                                        <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                            Native token (XAND) with staking, swaps, and rewards.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* External Resources */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl font-bold text-white mb-4">External Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <a
                            href="https://github.com/xandeum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                        >
                            <span className="font-medium text-white">GitHub</span>
                            <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                        </a>
                        <a
                            href="https://discord.gg/xandeum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                        >
                            <span className="font-medium text-white">Discord</span>
                            <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                        </a>
                        <a
                            href="https://twitter.com/xandeum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-4 flex items-center justify-between group hover:border-[var(--accent)] transition-colors"
                        >
                            <span className="font-medium text-white">Twitter</span>
                            <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
