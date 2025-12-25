'use client'

import { useState, createContext, useContext, ReactNode, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import {
    LayoutDashboard,
    TrendingUp,
    ArrowRightLeft,
    Coins,
    FileText,
    BarChart2,
    Trophy,
    List,
    Map,
    Star,
    GitCompare
} from 'lucide-react'

interface SidebarProps {
    isOpen: boolean
    onToggle: () => void
}

// Main pages
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
    },
    {
        title: 'Stake',
        href: '/stake',
        icon: Coins,
    },
]

// Dashboard sub-navigation (these were tabs)
const dashboardSubNavItems = [
    {
        title: 'Analytics',
        href: '/?tab=analytics',
        tab: 'analytics',
        icon: BarChart2,
    },
    {
        title: 'Leaderboard',
        href: '/?tab=leaderboard',
        tab: 'leaderboard',
        icon: Trophy,
    },
    {
        title: 'Directory',
        href: '/?tab=directory',
        tab: 'directory',
        icon: List,
    },
    {
        title: 'Map',
        href: '/?tab=map',
        tab: 'map',
        icon: Map,
    },
    {
        title: 'Watchlist',
        href: '/?tab=watchlist',
        tab: 'watchlist',
        icon: Star,
    },
    {
        title: 'Compare',
        href: '/?tab=compare',
        tab: 'compare',
        icon: GitCompare,
    },
]

// Docs in separate section
const docsNavItem = {
    title: 'Docs',
    href: '/docs',
    icon: FileText,
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentTab = searchParams.get('tab')

    const isOnDashboard = pathname === '/'

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
            <nav className="flex-1 py-4 px-3 overflow-y-auto">
                {/* Main Navigation */}
                <div className="space-y-1">
                    {mainNavItems.map((item) => {
                        const isActive = item.href === '/'
                            ? pathname === '/' && !currentTab
                            : pathname === item.href
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
                            </Link>
                        )
                    })}
                </div>

                {/* Dashboard Sub-navigation - only show when sidebar is open */}
                {isOpen && (
                    <>
                        <div className="mt-6 mb-2 px-3">
                            <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">
                                Dashboard Views
                            </span>
                        </div>
                        <div className="space-y-0.5">
                            {dashboardSubNavItems.map((item) => {
                                const isActive = isOnDashboard && currentTab === item.tab
                                const Icon = item.icon

                                return (
                                    <Link
                                        key={item.tab}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-[#1a1a1a] text-white'
                                            : 'text-[#666] hover:bg-[#141414] hover:text-white'
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#00FFAA]' : ''}`} />
                                        <span className="text-sm whitespace-nowrap">
                                            {item.title}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                )}

                {/* Docs - separate section */}
                <div className="mt-6 space-y-1">
                    {isOpen && (
                        <div className="mb-2 px-3">
                            <span className="text-[10px] font-semibold text-[#555] uppercase tracking-wider">
                                Resources
                            </span>
                        </div>
                    )}
                    <Link
                        href={docsNavItem.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${pathname.startsWith('/docs')
                            ? 'bg-[#1a1a1a] text-white'
                            : 'text-[#888] hover:bg-[#141414] hover:text-white'
                            }`}
                    >
                        <FileText className={`w-5 h-5 shrink-0 ${pathname.startsWith('/docs') ? 'text-[#00FFAA]' : ''}`} />
                        {isOpen && (
                            <span className="text-sm font-medium whitespace-nowrap">
                                Docs
                            </span>
                        )}
                    </Link>
                </div>
            </nav>
        </aside>
    )
}

// Sidebar Context and Provider
interface SidebarContextType {
    isOpen: boolean
    toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true)

    const toggle = () => setIsOpen(prev => !prev)

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            <div className="flex min-h-screen">
                <Suspense fallback={<div className="w-[260px] h-screen bg-[#0a0a0a]" />}>
                    <Sidebar isOpen={isOpen} onToggle={toggle} />
                </Suspense>
                <main className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-[260px]' : 'ml-16'}`}>
                    {children}
                </main>
            </div>
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}
