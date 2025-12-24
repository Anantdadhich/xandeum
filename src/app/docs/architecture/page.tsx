'use client'

import Link from 'next/link'
import { ArrowLeft, Layers, Server, Database, Network, ArrowRight } from 'lucide-react'

export default function ArchitecturePage() {
    return (
        <div className="min-h-screen py-12">
            <div className="container-main max-w-4xl mx-auto space-y-8">
                {/* Breadcrumb */}
                <Link
                    href="/docs"
                    className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documentation
                </Link>

                {/* Header */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                            <Layers className="w-6 h-6 text-[var(--accent)]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">Architecture</h1>
                    </div>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        Understanding the Xandeum network architecture and component interactions.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {/* Overview */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Network Overview</h2>
                        <p className="text-[var(--foreground-muted)] mb-6">
                            Xandeum is a decentralized storage network designed to provide permanent,
                            high-performance data storage integrated with the Solana blockchain. The
                            network consists of several interconnected components working together to
                            ensure data availability, integrity, and efficient retrieval.
                        </p>

                        {/* Architecture Diagram (simplified) */}
                        <div className="p-6 rounded-xl bg-[var(--background)] space-y-4">
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-center p-4 rounded-lg border border-[var(--card-border)]">
                                    <Database className="w-8 h-8 text-[var(--accent)] mx-auto mb-2" />
                                    <p className="text-sm font-medium text-white">Client</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-[var(--foreground-muted)]" />
                                <div className="text-center p-4 rounded-lg border border-[var(--accent)]">
                                    <Network className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-white">Network Layer</p>
                                </div>
                                <ArrowRight className="w-6 h-6 text-[var(--foreground-muted)]" />
                                <div className="text-center p-4 rounded-lg border border-[var(--card-border)]">
                                    <Server className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-white">pNodes</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Components */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Core Components</h2>

                        <div className="space-y-6">
                            <div className="border-b border-[var(--card-border)] pb-6">
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <Server className="w-5 h-5 text-[var(--accent)]" />
                                    Provider Nodes (pNodes)
                                </h3>
                                <p className="text-[var(--foreground-muted)] mb-4">
                                    pNodes are the backbone of the Xandeum storage network. They are
                                    responsible for storing data, serving requests, and maintaining
                                    data availability across the network.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
                                    <li>Store and replicate data across the network</li>
                                    <li>Handle read and write requests from clients</li>
                                    <li>Participate in consensus for data verification</li>
                                    <li>Earn rewards for providing storage services</li>
                                </ul>
                            </div>

                            <div className="border-b border-[var(--card-border)] pb-6">
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <Network className="w-5 h-5 text-purple-400" />
                                    Gossip Protocol
                                </h3>
                                <p className="text-[var(--foreground-muted)] mb-4">
                                    The gossip protocol enables efficient communication between nodes,
                                    allowing them to share state information and coordinate data
                                    replication.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
                                    <li>Node discovery and health monitoring</li>
                                    <li>State synchronization across nodes</li>
                                    <li>Efficient data location resolution</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                    <Database className="w-5 h-5 text-orange-400" />
                                    Data Layer
                                </h3>
                                <p className="text-[var(--foreground-muted)] mb-4">
                                    The data layer handles the actual storage and retrieval of data,
                                    implementing erasure coding and redundancy to ensure durability.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
                                    <li>Content-addressed storage with unique identifiers</li>
                                    <li>Erasure coding for efficient redundancy</li>
                                    <li>Merkle proofs for data verification</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Data Flow */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Data Flow</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] font-bold shrink-0">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Client Request</h4>
                                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                        Client sends a storage or retrieval request to the network.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] font-bold shrink-0">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Node Selection</h4>
                                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                        Network layer routes request to appropriate pNodes based on
                                        data location and node health.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] font-bold shrink-0">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Data Processing</h4>
                                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                        pNode processes the request, either storing new data or
                                        retrieving existing data.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 rounded-lg bg-[var(--background)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] font-bold shrink-0">
                                    4
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Replication</h4>
                                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                                        For write operations, data is replicated to multiple nodes
                                        for redundancy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Next Steps */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
                        <span className="text-[var(--foreground-muted)]">Next: Learn about running pNodes</span>
                        <Link
                            href="/docs/pnodes"
                            className="btn-primary py-2 px-4 flex items-center gap-2"
                        >
                            pNodes Guide
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
