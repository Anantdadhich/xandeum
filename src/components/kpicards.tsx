'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBytes, type NetworkAnalytics } from '@/lib/network-analytics'
import { Server, HardDrive, Activity, TrendingUp } from 'lucide-react'

interface KPICardsProps {
  metrics: NetworkAnalytics | null
  isLoading: boolean
}

export function KPICards({ metrics, isLoading }: KPICardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!metrics) {
    return null
  }

  const kpis = [
    {
      title: 'Total pNodes',
      value: metrics.totals.total.toLocaleString(),
      icon: Server,
      description: 'Active provider nodes',
    },
    {
      title: 'Total Capacity',
      value: formatBytes(metrics.storage.totalCapacity),
      icon: HardDrive,
      description: 'Available storage',
    },
    {
      title: 'Network Utilization',
      value: `${metrics.storage.utilizationPercentage.toFixed(1)}%`,
      icon: TrendingUp,
      description: `${formatBytes(metrics.storage.totalUsed)} used`,
    },
    {
      title: 'Average Uptime',
      value: `${metrics.performance.averageUptime.toFixed(2)}%`,
      icon: Activity,
      description: 'Network reliability',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}