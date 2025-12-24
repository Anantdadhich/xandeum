'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Activity,
    LayoutDashboard,
    TrendingUp,
    ArrowRightLeft,
    Coins,
    FileText,
    User,
    Settings,
    HelpCircle,
    Sparkles
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
]

const bottomNavItems = [
    {
        title: 'Docs',
        href: '/docs',
        icon: FileText,
    },
    {
        title: 'Settings',
        href: '#',
        icon: Settings,
    },
    {
        title: 'Support',
        href: '#',
        icon: HelpCircle,
    },
]

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside
            className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out ${isOpen ? 'w-56' : 'w-16'
                } bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col`}
        >
            {/* Logo Section */}
            <div className="h-14 flex items-center px-4 border-b border-[#1a1a1a]">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00FFAA] to-[#00AA88] flex items-center justify-center shrink-0">
                        <Activity className="w-4 h-4 text-black" />
                    </div>
                    {isOpen && (
                        <span className="text-base font-bold text-white whitespace-nowrap">
                            Xandeum
                        </span>
                    )}
                </Link>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 py-3 px-2">
                <div className="space-y-0.5">
                    {mainNavItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && pathname.startsWith(item.href))
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 group relative ${isActive
                                        ? 'bg-[#1a1a1a] text-white'
                                        : 'text-[#888] hover:bg-[#141414] hover:text-white'
                                    }`}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#00FFAA] rounded-r" />
                                )}
                                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00FFAA]' : ''}`} />
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

            {/* Divider */}
            <div className="mx-3 border-t border-[#1a1a1a]" />

            {/* Bottom Navigation */}
            <div className="py-3 px-2">
                <div className="space-y-0.5">
                    {bottomNavItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/' && item.href !== '#' && pathname.startsWith(item.href))
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-[#1a1a1a] text-white'
                                        : 'text-[#888] hover:bg-[#141414] hover:text-white'
                                    }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {isOpen && (
                                    <span className="text-sm font-medium whitespace-nowrap">
                                        {item.title}
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Pro Card */}
            {isOpen && (
                <div className="mx-2 mb-3 p-3 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#252525]">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-[#00FFAA]" />
                        <span className="text-sm font-semibold text-white">Pro Features</span>
                    </div>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                        Unlock advanced analytics and real-time alerts
                    </p>
                </div>
            )}
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
                className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-16'
                    }`}
            >
                {children}
            </main>
        </div>
    )
}
