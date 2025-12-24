'use client'

import { Card, CardContent } from '@/components/ui/card'
import { formatBytes, type NetworkAnalytics } from '@/lib/network-analytics'
import { Server, Database, Activity, Globe } from 'lucide-react'

interface KPICardsProps {
  metrics: NetworkAnalytics | null
  isLoading: boolean
}

export function KPICards({ metrics, isLoading }: KPICardsProps) {
  const kpis = [
    {
      title: 'Total pNodes',
      value: metrics ? metrics.totals.total.toLocaleString() : '0',
      icon: Server,
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
        )
      })}
    </div>
  )
}