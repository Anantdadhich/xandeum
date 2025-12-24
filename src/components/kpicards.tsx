'use client'

<<<<<<< HEAD
import { Card, CardContent } from '@/components/ui/card'
=======
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
import { formatBytes, type NetworkAnalytics } from '@/lib/network-analytics'
import { Server, Database, Activity, Globe } from 'lucide-react'

interface KPICardsProps {
  metrics: NetworkAnalytics | null
  isLoading: boolean
}

export function KPICards({ metrics, isLoading }: KPICardsProps) {
<<<<<<< HEAD
=======
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="kpi-card">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-8 w-32"></div>
                <div className="skeleton h-3 w-20"></div>
              </div>
              <div className="skeleton w-10 h-10 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!metrics) {
    return null
  }

>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
  const kpis = [
    {
      title: 'Total pNodes',
      value: metrics ? metrics.totals.total.toLocaleString() : '0',
      icon: Server,
<<<<<<< HEAD
      bg: 'bg-orange-50',
      color: 'text-orange-500',
    },
    {
      title: 'Total Storage',
      value: metrics ? formatBytes(metrics.storage.totalCapacity) : '0 GB',
      icon: Database,
      bg: 'bg-blue-50',
      color: 'text-blue-500',
    },
    {
      title: 'Data Stored',
      value: metrics ? formatBytes(metrics.storage.totalUsed) : '0 GB',
      icon: Activity,
      bg: 'bg-pink-50',
      color: 'text-pink-500',
    },
    {
      title: 'Avg Latency',
      value: '24ms', // Mock data to match image style
      icon: Globe,
      bg: 'bg-cyan-50',
      color: 'text-cyan-500',
=======
      description: `${metrics.totals.healthy} healthy`,
      accent: true,
    },
    {
      title: 'Total Capacity',
      value: formatBytes(metrics.storage.totalCapacity),
      icon: HardDrive,
      description: 'Available storage',
      accent: false,
    },
    {
      title: 'Utilization',
      value: `${metrics.storage.utilizationPercentage.toFixed(1)}%`,
      icon: TrendingUp,
      description: formatBytes(metrics.storage.totalUsed) + ' used',
      accent: false,
    },
    {
      title: 'Network Health',
      value: `${metrics.health.score}%`,
      icon: Activity,
      description: 'Health score',
      accent: true,
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
    },
  ]

  if (isLoading) {
     return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[...Array(4)].map((_,i) => (
             <div key={i} className="h-32 bg-white rounded-2xl animate-pulse shadow-sm" />
           ))}
        </div>
     )
  }

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <Card key={index} className="border-none shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow cursor-default">
            <CardContent className="p-6">
              <div className="mb-4">
                 <div className={`h-10 w-10 rounded-full ${kpi.bg} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                 </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
              </div>
            </CardContent>
          </Card>
=======
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <div
            key={kpi.title}
            className="kpi-card animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[var(--foreground-muted)]">
                  {kpi.title}
                </p>
                <p className={`kpi-value ${kpi.accent ? 'text-gradient' : ''}`}>
                  {kpi.value}
                </p>
                <p className="text-xs text-[var(--foreground-muted)]">
                  {kpi.description}
                </p>
              </div>
              <div className="kpi-icon">
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
        )
      })}
    </div>
  )
}