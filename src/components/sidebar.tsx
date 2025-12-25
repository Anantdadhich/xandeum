'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    TrendingUp,
    ArrowRightLeft,
    Coins,
    FileText
} from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    onToggle: () => void
}

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
    },
    {
        title: 'Trading',
        href: '/trading',
        icon: TrendingUp,
    },
    {
        title: 'Swap',
        href: '/swap',
        icon: ArrowRightLeft,
        badge: 'New'
    },
    {
        title: 'Stake',
        href: '/stake',
        icon: Coins,
    },
    {
        title: 'Docs',
        href: '/docs',
        icon: FileText,
    },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside
            className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out ${isOpen ? 'w-[260px]' : 'w-16'
                } bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col`}
        >
            {/* Logo Section */}
            <div className="h-16 flex items-center px-4 border-b border-[#1a1a1a]">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/icon.webp"
                        alt="Xandeum"
                        width={36}
                        height={36}
                        className="shrink-0"
                        priority
                    />
                    {isOpen && (
                        <span className="text-lg font-bold text-white whitespace-nowrap">
                            Xandeum
                        </span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3">
                <div className="space-y-1">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href))
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                                        ? 'bg-[#1a1a1a] text-white'
                                        : 'text-[#888] hover:bg-[#141414] hover:text-white'
                                    }`}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#00FFAA] rounded-r" />
                                )}
                                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#00FFAA]' : ''}`} />
                                {isOpen && (
                                    <span className="text-sm font-medium whitespace-nowrap flex-1">
                                        {item.title}
                                    </span>
                                )}
                                {isOpen && item.badge && (
                                    <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#00FFAA] text-black rounded">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </aside>
    )
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true)

    // Keyboard shortcut handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className="flex min-h-screen bg-[#050505]">
            <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            <main
                className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[260px]' : 'ml-16'
                    }`}
            >
                {children}
            </main>
        </div>
    )
}
