'use client'

import { useState } from 'react'
import { Bell, Search, ChevronRight } from 'lucide-react'

interface DashboardHeaderProps {
    breadcrumb?: string[]
    title: string
}

export function DashboardHeader({ breadcrumb = ['Dashboard'], title }: DashboardHeaderProps) {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <header className="h-14 border-b border-[#1a1a1a] bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-30">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left: Breadcrumb & Title */}
                <div>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1.5 text-xs text-[#666] mb-0.5">
                        {breadcrumb.map((item, index) => (
                            <span key={item} className="flex items-center gap-1.5">
                                {index > 0 && <ChevronRight className="w-3 h-3" />}
                                <span className={index === breadcrumb.length - 1 ? 'text-[#888]' : ''}>
                                    {item}
                                </span>
                            </span>
                        ))}
                    </div>
                    {/* Title */}
                    <h1 className="text-lg font-semibold text-white">{title}</h1>
                </div>

                {/* Right: Search & Notifications */}
                <div className="flex items-center gap-3">
                    {/* Notification Bell */}
                    <button className="relative p-2 rounded-lg hover:bg-[#1a1a1a] text-[#888] hover:text-white transition-colors">
                        <Bell className="w-4 h-4" />
                        {/* Notification dot */}
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#00FFAA] rounded-full" />
                    </button>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-52 pl-9 pr-4 py-2 rounded-lg bg-[#141414] border border-[#252525] text-sm text-white placeholder:text-[#666] focus:border-[#00FFAA]/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
