'use client'

import { formatBytes, type NetworkAnalytics } from '@/lib/network-analytics'
import { Server, Database, Activity, Globe } from 'lucide-react'

interface KPICardsProps {
  metrics: NetworkAnalytics | null
  isLoading: boolean
}

// Loading skeleton component
function KPICardSkeleton() {
  return (
    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5">
      {/* Icon skeleton */}
      <div className="mb-3">
        <div className="h-10 w-10 rounded-lg bg-[#1a1a1a] animate-pulse" />
      </div>
      {/* Text skeleton */}
      <div>
        <div className="h-3 w-20 bg-[#1a1a1a] rounded animate-pulse mb-2" />
        <div className="h-6 w-16 bg-[#1a1a1a] rounded animate-pulse" />
      </div>
    </div>
  )
}

export function KPICards({ metrics, isLoading }: KPICardsProps) {
  const kpis = [
    {
      title: 'Total pNodes',
      value: metrics ? metrics.totals.total.toLocaleString() : '0',
      icon: Server,
      bg: 'bg-[#1a2520]',
      color: 'text-[#00FFAA]',
    },
    {
      title: 'Total Storage',
      value: metrics ? formatBytes(metrics.storage.totalCapacity) : '0 GB',
      icon: Database,
      bg: 'bg-[#1a1a25]',
      color: 'text-[#7B61FF]',
    },
    {
      title: 'Data Stored',
      value: metrics ? formatBytes(metrics.storage.totalUsed) : '0 GB',
      icon: Activity,
      bg: 'bg-[#251a20]',
      color: 'text-[#FF2D55]',
    },
    {
      title: 'Avg Latency',
      value: '24ms',
      icon: Globe,
      bg: 'bg-[#1a2025]',
      color: 'text-[#00D1FF]',
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <div
            key={index}
            className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl p-5 hover:border-[#252525] transition-colors"
          >
            <div className="mb-3">
              <div className={`h-10 w-10 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-[#666] mb-1">{kpi.title}</p>
              <h3 className="text-xl font-bold text-white">{kpi.value}</h3>
            </div>
          </div>
        )
      })}
    </div>
  )
}