'use client'

import { useState } from 'react'
import {
    LayoutDashboard,
    BarChart2,
    Trophy,
    List,
    Map,
    Star,
    GitCompare
} from 'lucide-react'

export type TabId = 'overview' | 'analytics' | 'leaderboard' | 'directory' | 'map' | 'watchlist' | 'compare'

interface Tab {
    id: TabId
    label: string
    icon: React.ElementType
}

const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'directory', label: 'Directory', icon: List },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'compare', label: 'Compare', icon: GitCompare },
]

interface DashboardTabsProps {
    activeTab: TabId
    onTabChange: (tab: TabId) => void
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
    return (
        <div className="flex items-center gap-1 p-1 bg-[var(--card)] rounded-xl border border-[var(--card-border)] overflow-x-auto">
            {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${isActive
                                ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                                : 'text-[var(--foreground-muted)] hover:text-white hover:bg-[var(--card-hover)]'
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}
