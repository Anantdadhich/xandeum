'use client'

import { memo } from 'react'
import { ExternalLink, BarChart2 } from 'lucide-react'

function BirdeyeChartComponent() {
    // XAND token address - from explorerxandeum.vercel.app
    const tokenAddress = "XANDuUoVoUqniKkpcKhrxmvYJybpJvUxJLr21Gaj3Hx"

    // Birdeye TV widget embed URL - exact format from explorerxandeum.vercel.app
    const birdeyeEmbedUrl = `https://birdeye.so/tv-widget/${tokenAddress}?chain=solana&viewMode=pair&chartInterval=15&chartType=CANDLE&chartTimezone=Asia%2FKolkata&chartLeftToolbar=show&theme=dark`

    return (
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#1a1a1a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#888]" />
                    <span className="text-sm font-bold text-white">XAND/USD Chart</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href={`https://birdeye.so/token/${tokenAddress}?chain=solana`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#888] hover:text-[#00FFAA] flex items-center gap-1 transition-colors"
                    >
                        Birdeye <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                        href={`https://dexscreener.com/solana/${tokenAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#888] hover:text-[#00FFAA] flex items-center gap-1 transition-colors"
                    >
                        DexScreener <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Birdeye Chart Iframe - exact same format as explorerxandeum.vercel.app */}
            <div style={{ height: '480px', width: '100%', background: '#0d0d0d' }}>
                <iframe
                    src={birdeyeEmbedUrl}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#0d0d0d'
                    }}
                    title="XAND/USD Chart - Birdeye"
                    allow="clipboard-write"
                    loading="eager"
                    allowFullScreen
                />
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[#1a1a1a] flex items-center gap-2">
                <span className="text-[#FF5722] text-sm">🔥</span>
                <span className="text-[10px] text-[#666]">Powered by Birdeye</span>
            </div>
        </div>
    )
}

export const TradingViewChart = memo(BirdeyeChartComponent)
