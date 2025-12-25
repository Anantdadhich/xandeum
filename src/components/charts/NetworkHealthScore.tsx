'use client'

import { ShieldCheck, ShieldAlert, ShieldOff } from 'lucide-react'

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
    <div className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl h-full flex flex-col">
      <div className="p-5">
        <h3 className="text-base font-bold text-white">Network Health Score</h3>
        <p className="text-xs text-[#666] mt-1">
          Overall network performance and reliability
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-5">
        <div className="text-center">
          <div className="relative w-28 h-28 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="stroke-[#1a1a1a]"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="stroke-[#00FFAA]"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.5))' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">{Math.round(score)}</span>
              <span className="text-xs text-[#666]">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className='flex items-center gap-2 text-[#888]'>
              <ShieldCheck className='w-3.5 h-3.5 text-[#00FFAA]' /> Healthy
            </span>
            <span className="text-white">{healthyPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
            <div className="bg-[#00FFAA] h-1.5 rounded-full" style={{ width: `${healthyPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className='flex items-center gap-2 text-[#888]'>
              <ShieldAlert className='w-3.5 h-3.5 text-[#FFB800]' /> Degraded
            </span>
            <span className="text-white">{degradedPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
            <div className="bg-[#FFB800] h-1.5 rounded-full" style={{ width: `${degradedPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className='flex items-center gap-2 text-[#888]'>
              <ShieldOff className='w-3.5 h-3.5 text-[#FF2D55]' /> Offline
            </span>
            <span className="text-white">{offlinePercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
            <div className="bg-[#FF2D55] h-1.5 rounded-full" style={{ width: `${offlinePercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1a1a1a] grid grid-cols-3 text-center text-xs">
        <div className='p-3 border-r border-[#1a1a1a]'>
          <p className='text-lg font-bold text-white'>{total}</p>
          <p className='text-[#666]'>Total</p>
        </div>
        <div className='p-3 border-r border-[#1a1a1a]'>
          <p className='text-lg font-bold text-[#00FFAA]'>{healthy}</p>
          <p className='text-[#666]'>Healthy</p>
        </div>
        <div className='p-3'>
          <p className='text-lg font-bold text-[#FFB800]'>{degraded}</p>
          <p className='text-[#666]'>Degraded</p>
        </div>
      </div>
    </div>
  )
}
