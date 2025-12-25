'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Twitter, Github, MessageCircle } from 'lucide-react'

const navigation = {
    product: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Stake', href: '/stake' },
        { name: 'Swap', href: '/swap' },
        { name: 'Trading', href: '/trading' },
    ],
    resources: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/docs/api' },
        { name: 'Architecture', href: '/docs/architecture' },
    ],
    company: [
        { name: 'About', href: 'https://www.xandeum.network/' },
        { name: 'Blog', href: 'https://www.xandeum.network/' },
        { name: 'Careers', href: 'https://www.xandeum.network/' },
    ],
}

const socials = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/xandeum' },
    { name: 'Discord', icon: MessageCircle, href: 'https://discord.gg/xandeum' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/xandeum' },
]

export function Footer() {
    return (
        <footer className="relative pt-32 pb-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-[#050505]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,255,170,0.1)_0%,transparent_50%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* CTA Section */}
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Ready to take control of your{' '}
                        <span className="bg-gradient-to-r from-[#00FFAA] to-[#00AAFF] bg-clip-text text-transparent">
                            crypto?
                        </span>
                    </h2>
                    <p className="text-lg text-[#888] max-w-2xl mx-auto mb-10">
                        Join thousands of users who trust Xandeum for secure, seamless,
                        and efficient staking and storage solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://xandsol.xandeum.network/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 text-base font-semibold text-black bg-gradient-to-r from-[#00FFAA] to-[#00CC88] rounded-xl hover:shadow-[0_0_40px_rgba(0,255,170,0.5)] transition-all duration-300"
                        >
                            <span className="flex items-center gap-2">
                                Start Staking Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <Link
                            href="/dashboard"
                            className="px-8 py-4 text-base font-medium text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#00FFAA]/30 transition-all duration-300"
                        >
                            Explore Dashboard
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

                {/* Footer grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <Image
                                src="/icon.webp"
                                alt="Xandeum"
                                width={40}
                                height={40}
                                className="shrink-0"
                            />
                            <span className="text-xl font-bold text-white">Xandeum</span>
                        </Link>
                        <p className="text-sm text-[#888] max-w-xs mb-6">
                            Exabytes for Solana Programs. Building the future of decentralized storage.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#00FFAA]/30 hover:text-[#00FFAA] transition-all"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {navigation.product.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-[#888] hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-[#888] hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#888] hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-sm text-[#666] mb-4 md:mb-0">
                        © 2025 Xandeum Foundation. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="https://www.xandeum.network/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#666] hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="https://www.xandeum.network/termsofservice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#666] hover:text-white transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
