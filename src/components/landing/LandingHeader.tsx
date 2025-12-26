'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'Why Xandeum?', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Staking', href: '#staking' },
    { label: 'FAQ', href: '#faq' },
]

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#050505]/95 backdrop-blur-xl'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5"
                >
                    <Image
                        src="/icon.webp"
                        alt="Xandeum"
                        width={26}
                        height={26}
                        className="shrink-0"
                        priority
                    />
                    <span className="text-[18px] font-semibold text-white">Xandeum</span>
                </Link>

                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[15px] text-[#bbb] hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <div
                    className="hidden md:block"
                >
                    <Link
                        href="/dashboard"
                        className="px-5 py-2.5 text-[14px] font-medium text-black bg-[#00FFAA] rounded-full hover:bg-[#00E699] transition-colors duration-200"
                    >
                        Launch App
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5">
                    <nav className="flex flex-col p-6 gap-5">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-[15px] text-[#bbb] hover:text-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            href="/dashboard"
                            className="mt-4 px-5 py-3 text-[14px] font-medium text-black text-center bg-[#00FFAA] rounded-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Launch App
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
