'use client'

import dynamic from 'next/dynamic'

const NodeMap = dynamic(() => import('./NodeMap'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full glass-card flex items-center justify-center text-[var(--foreground-muted)] animate-pulse">
            Loading Map...
        </div>
    ),
})

export default NodeMap
