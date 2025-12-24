'use client'

import { ShieldCheck, ShieldAlert, ShieldOff, Server } from 'lucide-react'

interface NetworkHealthScoreProps {
  metrics: {
    score: number;
    healthyPercentage: number;
    degradedPercentage: number;
    offlinePercentage: number;
    total: number;
    healthy: number;
    degraded: number;
  };
}

export function NetworkHealthScore({ metrics }: NetworkHealthScoreProps) {
  const { score, healthyPercentage, degradedPercentage, offlinePercentage, total, healthy, degraded } = metrics;

  return (
    <div className="glass-card h-full flex flex-col">
      <div className="p-6">
        <h3 className="text-lg font-bold">Network Health Score</h3>
        <p className="text-sm text-muted-foreground">
          Overall network performance and reliability
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-700/50"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="text-teal-500"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{Math.round(score)}</span>
              <span className="text-sm text-muted-foreground">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className='flex items-center gap-2'><ShieldCheck className='w-4 h-4 text-green-500' /> Healthy Nodes</span>
                <span>{healthyPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${healthyPercentage}%` }}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className='flex items-center gap-2'><ShieldAlert className='w-4 h-4 text-yellow-500' /> Degraded Nodes</span>
                <span>{degradedPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${degradedPercentage}%` }}></div>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className='flex items-center gap-2'><ShieldOff className='w-4 h-4 text-red-500' /> Offline Nodes</span>
                <span>{offlinePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${offlinePercentage}%` }}></div>
            </div>
        </div>
      </div>

      <div className="border-t border-border/50 grid grid-cols-3 text-center text-sm">
        <div className='p-4 border-r border-border/50'>
            <p className='text-xl font-bold'>{total}</p>
            <p className='text-muted-foreground'>Total</p>
        </div>
        <div className='p-4 border-r border-border/50'>
            <p className='text-xl font-bold text-green-500'>{healthy}</p>
            <p className='text-muted-foreground'>Healthy</p>
        </div>
        <div className='p-4'>
            <p className='text-xl font-bold text-yellow-500'>{degraded}</p>
            <p className='text-muted-foreground'>Degraded</p>
        </div>
      </div>
    </div>
  )
}
