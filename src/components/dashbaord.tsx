'use client'

import { useEffect } from 'react'
import { useDashboardStore } from '@/lib/store'
import { KPICards } from '@/components/kpicards'
import { SearchFilter } from '@/components/searchfilter'
import { PNodesTable } from '@/components/pnodestable'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'

const REFRESH_INTERVAL = 5 * 60 * 1000 

export function Dashboard() {
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

    
    const interval = setInterval(() => {
      refreshData()
    }, REFRESH_INTERVAL)

    // Cleanup
    return () => clearInterval(interval)
  }, [refreshData])

  const handleManualRefresh = () => {
    refreshData()
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
     
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Xandeum pNodes Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of Xandeum Provider Nodes
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button
            onClick={handleManualRefresh}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive">Error</h3>
            <p className="text-sm text-destructive/90 mt-1">{error}</p>
          </div>
        </div>
      )}

     
      <KPICards metrics={metrics} isLoading={isLoading} />

    
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchFilter
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by pubkey or IP address..."
            />
          </div>
        </div>

        {isLoading && !pnodes.length ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-5 w-5 animate-spin" />
              <p className="text-muted-foreground">Loading pNodes data...</p>
            </div>
          </div>
        ) : (
          <PNodesTable
            pnodes={pnodes.map((n) => {
              const ip = n.address.split(':')[0] || n.address
              const utilization = (typeof n.total_bytes === 'number' && typeof n.file_size === 'number' && n.file_size > 0)
                ? (n.total_bytes / n.file_size) * 100
                : undefined
              const status = getNodeHealth(n.last_seen_timestamp).status
              return {
                pubkey: n.pubkey || '',
                ip,
                uptime: typeof n.uptime === 'number' ? n.uptime : undefined,
                utilizationPercent: utilization,
                status,
              }
            })}
            searchQuery={searchQuery}
            sortColumn={
              (['pubkey','uptime','utilizationPercent'] as readonly string[]).includes(
                (sortColumn as unknown as string)
              )
                ? (sortColumn as any)
                : null
            }
            sortDirection={sortDirection}
            onSort={(col) => setSorting(col as any)}
          />
        )}
      </div>

     
      <div className="text-center text-sm text-muted-foreground pt-4 border-t">
        <p>Auto-refreshes every 5 minutes</p>
        <p className="mt-1">
          Showing {pnodes.length} provider node{pnodes.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}