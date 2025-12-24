'use client'

import { useEffect, useState, useMemo } from 'react'
import { useDashboardStore } from '@/lib/store'
import { KPICards } from '@/components/kpicards'
import { NetworkHealthCard } from '@/components/network-health-card'
import { SearchFilter } from '@/components/searchfilter'
import { PNodesTable } from '@/components/pnodestable'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw, LayoutGrid, Calendar, Bell, ChevronDown } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'

const REFRESH_INTERVAL = 5 * 60 * 1000

export function Dashboard() {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  
  const {
    pnodes,
    metrics,
    isLoading,
    error,
    lastUpdated,
    searchQuery,
    sortColumn,
    sortDirection,
    setSearchQuery,
    setSorting,
    refreshData,
  } = useDashboardStore()

  useEffect(() => {
    refreshData()
    if (isAutoRefresh) {
      const interval = setInterval(() => refreshData(), REFRESH_INTERVAL)
      return () => clearInterval(interval)
    }
  }, [refreshData, isAutoRefresh])

  const formattedNodes = useMemo(() => {
    return pnodes.map((n, index) => {
      const ip = n.address.split(':')[0] || n.address
      const utilization = (typeof n.total_bytes === 'number' && typeof n.file_size === 'number' && n.file_size > 0)
        ? (n.total_bytes / n.file_size) * 100
        : undefined
      const status = getNodeHealth(n.last_seen_timestamp).status

      return {
        address: n.address,
        pubkey: n.pubkey || `node-${index}`,
        ip,
        uptime: typeof n.uptime === 'number' ? n.uptime : undefined,
        utilizationPercent: utilization,
        status,
      }
    })
  }, [pnodes])

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-4 md:p-8 font-sans text-slate-800">
      
      {/* Top Header (Matches 'Blue Chips Chicago' header) */}
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
            X
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Xandeum Network</h1>
            <p className="text-xs text-slate-400">Real-time pNode Monitor</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mock Navigation Tabs */}
          <div className="hidden md:flex items-center gap-6 mr-8 text-sm font-medium text-slate-400">
             <span className="text-slate-900 border-b-2 border-red-500 pb-1 cursor-pointer">Dashboard</span>
             <span className="hover:text-slate-600 cursor-pointer transition-colors">Analytics</span>
             <span className="hover:text-slate-600 cursor-pointer transition-colors">Settings</span>
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
             <span className="text-xs text-slate-400 font-mono hidden sm:block">
               {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Syncing...'}
             </span>
             <Button
                variant="ghost"
                size="icon"
                onClick={() => refreshData()}
                className="text-slate-400 hover:text-blue-600"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
             </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* KPI Cards Section */}
        <section>
          {/* KPI Cards & Health Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <KPICards metrics={metrics} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-1">
              <NetworkHealthCard metrics={metrics} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Table Section (Takes up 2/3 width on large screens) */}
          <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-2">
              <CardTitle className="text-lg font-bold text-slate-800">
                Active Provider Nodes
              </CardTitle>
              <Button variant="ghost" className="text-blue-500 text-sm font-medium hover:bg-blue-50">
                + Add Node
              </Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="px-6 pb-4">
                  <SearchFilter value={searchQuery} onChange={setSearchQuery} />
               </div>
               <PNodesTable
                  pnodes={formattedNodes}
                  searchQuery={searchQuery}
                  sortColumn={
                    (['pubkey','uptime','utilizationPercent'] as readonly string[]).includes((sortColumn as string))
                      ? (sortColumn as any)
                      : null
                  }
                  sortDirection={sortDirection}
                  onSort={(col) => setSorting(col as any)}
               />
            </CardContent>
          </Card>

          {/* Side Widget (Matches 'Audience Age & Gender' card style) */}
          <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Network Health</h3>
              <MoreHorizontalIcon />
            </div>
            
            {/* Custom Chart/List visualization */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Global Uptime</span>
                  <span className="text-sm font-bold text-green-500">99.8%</span>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '99.8%' }}></div>
               </div>

               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Storage Used</span>
                  <span className="text-sm font-bold text-blue-500">
                    {metrics?.storage?.utilizationPercentage?.toFixed(1) || 0}%
                  </span>
               </div>
               <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full" 
                    style={{ width: `${metrics?.storage?.utilizationPercentage || 0}%` }}
                  ></div>
               </div>

               <div className="pt-4 border-t border-slate-100 mt-4">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <LayoutGrid className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">System Status</p>
                      <p className="text-xs text-slate-400">All systems operational</p>
                    </div>
                 </div>
               </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

function MoreHorizontalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 h-5 w-5 cursor-pointer hover:text-slate-500"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
  )
}