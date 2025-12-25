'use client'

import Link from 'next/link'
import { ArrowLeft, Server, Terminal, Check, AlertCircle, ArrowRight } from 'lucide-react'

export default function PNodesPage() {
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
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Server className="w-6 h-6 text-purple-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">pNodes Guide</h1>
                    </div>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        Complete guide to running and maintaining Provider Nodes on the Xandeum network.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {/* Requirements */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">System Requirements</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-[var(--background)]">
                                <h3 className="font-medium text-white mb-2">Minimum</h3>
                                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                                    <li>• 4 CPU cores</li>
                                    <li>• 16 GB RAM</li>
                                    <li>• 500 GB SSD storage</li>
                                    <li>• 100 Mbps network</li>
                                </ul>
                            </div>
                            <div className="p-4 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent)]/30">
                                <h3 className="font-medium text-white mb-2">Recommended</h3>
                                <ul className="space-y-2 text-sm text-[var(--foreground-muted)]">
                                    <li>• 8+ CPU cores</li>
                                    <li>• 32 GB RAM</li>
                                    <li>• 2 TB NVMe SSD</li>
                                    <li>• 1 Gbps network</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Installation */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-[var(--accent)]" />
                            Installation
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-white mb-2">1. Download the binary</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`curl -sSfL https://releases.xandeum.io/pnode/latest/install.sh | sh`}
                                    </code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">2. Generate keypair</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`xandeum-keygen new -o ~/xandeum/keypair.json`}
                                    </code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">3. Configure node</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`# config.yaml
identity: ~/xandeum/keypair.json
gossip_port: 8001
rpc_port: 8899
storage_path: /var/xandeum/data
log_level: info`}
                                    </code>
                                </pre>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">4. Start the node</h3>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {`xandeum-pnode --config config.yaml`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Verification */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Check className="w-5 h-5 text-green-400" />
                            Verification
                        </h2>

                        <p className="text-[var(--foreground-muted)] mb-4">
                            After starting your node, verify it is running correctly:
                        </p>

                        <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                            <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                {`# Check node health
curl http://localhost:8899/health

# Expected response:
{"status": "ok", "version": "1.2.3"}`}
                            </code>
                        </pre>

                        <p className="text-[var(--foreground-muted)] mt-4">
                            Your node should appear in the network explorer within 5-10 minutes.
                        </p>
                    </section>

                    {/* Rewards */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4">Earning Rewards</h2>

                        <p className="text-[var(--foreground-muted)] mb-4">
                            pNode operators earn rewards based on:
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]">
                                <div className="w-6 h-6 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] text-sm font-bold shrink-0">
                                    1
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Uptime</h4>
                                    <p className="text-sm text-[var(--foreground-muted)]">
                                        Maintaining high availability (target: 99.9%)
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]">
                                <div className="w-6 h-6 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] text-sm font-bold shrink-0">
                                    2
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Storage Provided</h4>
                                    <p className="text-sm text-[var(--foreground-muted)]">
                                        Amount of data stored and served
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--background)]">
                                <div className="w-6 h-6 rounded-full bg-[var(--accent-subtle)] flex items-center justify-center text-[var(--accent)] text-sm font-bold shrink-0">
                                    3
                                </div>
                                <div>
                                    <h4 className="font-medium text-white">Performance</h4>
                                    <p className="text-sm text-[var(--foreground-muted)]">
                                        Fast response times and low latency
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Troubleshooting */}
                    <section className="glass-card p-6">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-400" />
                            Troubleshooting
                        </h2>

                        <div className="space-y-4">
                            <div className="border-b border-[var(--card-border)] pb-4">
                                <h3 className="font-medium text-white mb-2">Node not appearing in explorer</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Ensure your gossip port (8001) is accessible from the internet.
                                    Check firewall settings and port forwarding.
                                </p>
                            </div>

                            <div className="border-b border-[var(--card-border)] pb-4">
                                <h3 className="font-medium text-white mb-2">High CPU usage</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    This is normal during initial sync. CPU should stabilize after
                                    the node catches up with the network.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium text-white mb-2">Connection errors</h3>
                                <p className="text-sm text-[var(--foreground-muted)]">
                                    Verify your network configuration and ensure you can reach
                                    other nodes in the network.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Next Steps */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--card)] border border-[var(--card-border)]">
                        <span className="text-[var(--foreground-muted)]">Next: Explore the API</span>
                        <Link
                            href="/docs/api"
                            className="btn-primary py-2 px-4 flex items-center gap-2"
                        >
                            API Reference
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
