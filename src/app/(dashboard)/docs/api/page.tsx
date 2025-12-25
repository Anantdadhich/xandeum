'use client'

import Link from 'next/link'
import { ArrowLeft, Code, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface Endpoint {
    method: 'GET' | 'POST'
    path: string
    description: string
    response: string
}

const endpoints: Endpoint[] = [
    {
        method: 'GET',
        path: '/api/pnodes',
        description: 'Get list of all active provider nodes with basic info',
        response: `{
  "success": true,
  "data": [
    {
      "address": "192.168.1.1:8001",
      "pubkey": "ABC123...",
      "version": "1.2.3",
      "last_seen_timestamp": 1703500000,
      "cpu_percent": 45.2,
      "ram_used": 8589934592,
      "ram_total": 17179869184,
      "uptime": 864000
    }
  ]
}`
    },
    {
        method: 'GET',
        path: '/api/network/overview',
        description: 'Get network-wide analytics and health metrics',
        response: `{
  "success": true,
  "data": {
    "totals": {
      "total": 251,
      "healthy": 216,
      "degraded": 25,
      "offline": 10
    },
    "health": {
      "score": 86,
      "healthyPercentage": 86.1
    },
    "versions": {
      "latest": "1.2.3",
      "distribution": {
        "1.2.3": 180,
        "1.2.2": 50,
        "1.2.1": 21
      }
    }
  }
}`
    },
    {
        method: 'GET',
        path: '/api/pnodes/leaderboard',
        description: 'Get top performing nodes ranked by pod credits',
        response: `{
  "success": true,
  "data": [
    {
      "rank": 1,
      "pubkey": "ABC123...",
      "podCredits": 9500,
      "uptime": 30.5,
      "cpu": 25.3,
      "storage": 85.2
    }
  ]
}`
    },
    {
        method: 'GET',
        path: '/api/trading',
        description: 'Get current token prices for XAND and SOL',
        response: `{
  "success": true,
  "data": {
    "xand": {
      "price": 0.0234,
      "change24h": 5.2,
      "volume24h": 1250000
    },
    "sol": {
      "price": 98.45,
      "change24h": -1.8,
      "volume24h": 850000000
    }
  }
}`
    },
    {
        method: 'GET',
        path: '/api/staking',
        description: 'Get liquid staking information and APY',
        response: `{
  "success": true,
  "data": {
    "apy": 7.20,
    "exchangeRate": 1.072,
    "totalStaked": 15000000,
    "validators": 42
  }
}`
    },
]

export default function ApiDocsPage() {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

    const copyCode = (code: string, endpoint: string) => {
        navigator.clipboard.writeText(code)
        setCopiedEndpoint(endpoint)
        setTimeout(() => setCopiedEndpoint(null), 2000)
    }

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
                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                            <Code className="w-6 h-6 text-orange-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white">API Reference</h1>
                    </div>
                    <p className="text-lg text-[var(--foreground-muted)]">
                        REST API documentation for accessing Xandeum network data programmatically.
                    </p>
                </div>

                {/* Base URL */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Base URL</h2>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--background)] font-mono text-sm">
                        <code className="text-[var(--accent)]">https://your-domain.com</code>
                        <button
                            onClick={() => copyCode('https://your-domain.com', 'base')}
                            className="p-1.5 rounded hover:bg-[var(--card)] text-[var(--foreground-muted)] hover:text-white transition-colors"
                        >
                            {copiedEndpoint === 'base' ? (
                                <Check className="w-4 h-4 text-[var(--accent)]" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Endpoints */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Endpoints</h2>

                    {endpoints.map((endpoint) => (
                        <div key={endpoint.path} className="glass-card overflow-hidden">
                            {/* Endpoint Header */}
                            <div className="flex items-center gap-3 p-4 border-b border-[var(--card-border)]">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${endpoint.method === 'GET'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {endpoint.method}
                                </span>
                                <code className="font-mono text-white">{endpoint.path}</code>
                            </div>

                            {/* Description */}
                            <div className="p-4 border-b border-[var(--card-border)]">
                                <p className="text-[var(--foreground-muted)]">{endpoint.description}</p>
                            </div>

                            {/* Response */}
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-[var(--foreground-muted)]">
                                        Response
                                    </span>
                                    <button
                                        onClick={() => copyCode(endpoint.response, endpoint.path)}
                                        className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-[var(--foreground-muted)] hover:text-white hover:bg-[var(--card)] transition-colors"
                                    >
                                        {copiedEndpoint === endpoint.path ? (
                                            <>
                                                <Check className="w-3 h-3 text-[var(--accent)]" />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-3 h-3" />
                                                Copy
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                                    <code className="text-sm font-mono text-[var(--foreground-muted)]">
                                        {endpoint.response}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Rate Limiting */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Rate Limiting</h2>
                    <p className="text-[var(--foreground-muted)] mb-4">
                        API requests are rate limited to ensure fair usage:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[var(--foreground-muted)]">
                        <li>100 requests per minute for unauthenticated requests</li>
                        <li>1000 requests per minute for authenticated requests</li>
                        <li>Rate limit headers are included in all responses</li>
                    </ul>
                </div>

                {/* Error Handling */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-3">Error Responses</h2>
                    <p className="text-[var(--foreground-muted)] mb-4">
                        All errors follow a consistent format:
                    </p>
                    <pre className="p-4 rounded-lg bg-[var(--background)] overflow-x-auto">
                        <code className="text-sm font-mono text-[var(--foreground-muted)]">
                            {`{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests"
  }
}`}
                        </code>
                    </pre>
                </div>

                {/* SDK Links */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">SDKs & Libraries</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="#"
                            className="flex items-center justify-between p-4 rounded-lg bg-[var(--background)] hover:bg-[var(--card)] transition-colors group"
                        >
                            <div>
                                <p className="font-medium text-white">JavaScript SDK</p>
                                <p className="text-sm text-[var(--foreground-muted)]">npm install @xandeum/sdk</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-between p-4 rounded-lg bg-[var(--background)] hover:bg-[var(--card)] transition-colors group"
                        >
                            <div>
                                <p className="font-medium text-white">Python SDK</p>
                                <p className="text-sm text-[var(--foreground-muted)]">pip install xandeum</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[var(--foreground-muted)] group-hover:text-[var(--accent)]" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
