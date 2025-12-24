'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { NetworkAnalytics } from '@/types/pnode'

interface NetworkHealthCardProps {
  metrics: NetworkAnalytics | null
  isLoading: boolean
}

const StatRow = ({
  color,
  label,
  percentage,
  count,
}: {
  color: string
  label: string
  percentage: number
  count: number
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-start gap-3">
      <div className={`mt-1 h-3 w-3 rounded-full ${color} shadow-sm`} />
      <div>
        <p className="text-sm font-bold text-slate-700">{percentage.toFixed(1)}%</p>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
      </div>
    </div>
    <span className="text-sm font-bold text-slate-700">{count}</span>
  </div>
)

export function NetworkHealthCard({ metrics, isLoading }: NetworkHealthCardProps) {
  const radius = 60
  const circumference = 2 * Math.PI * radius

  if (isLoading || !metrics) {
    return (
      <Card className="border-none shadow-sm rounded-2xl bg-white h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">
            Network Health
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <div className="h-24 w-24 bg-muted animate-pulse rounded-full" />
        </CardContent>
      </Card>
    )
  }

  const { health, totals } = metrics
  const strokeDashoffset = circumference - (health.score / 100) * circumference

  return (
    <Card className="border-none shadow-sm rounded-2xl bg-white h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-slate-800">
          Network Health
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-4">
        <div className="flex items-center justify-center">
          <div className="relative h-40 w-40">
            <svg className="h-full w-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                strokeWidth="10"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-blue-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-800">
                {health.score.toFixed(0)}
              </span>
              <span className="text-sm font-medium text-slate-400">/ 100</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <StatRow
            color="bg-green-500"
            label="Healthy Nodes"
            percentage={health.healthyPercentage}
            count={totals.healthy}
          />
          <StatRow
            color="bg-yellow-400"
            label="Degraded Nodes"
            percentage={health.degradedPercentage}
            count={totals.degraded}
          />
          <StatRow
            color="bg-red-500"
            label="Offline Nodes"
            percentage={health.offlinePercentage}
            count={totals.offline}
          />
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-400">Total pNodes</span>
            <span className="text-lg font-bold text-slate-800">{totals.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}