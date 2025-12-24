'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBytes, formatUptime } from '@/lib/network-analytics'
import { EnrichedPNodeInfo, PNodeStats } from '@/types/pnode'


interface NodeDetails {
  address: string
  stats: PNodeStats
  version: string
  geolocation: any
  lastUpdated: string
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-sm font-medium text-slate-800 text-right">{value}</p>
  </div>
)

export default function PNodeDetailPage() {
  const params = useParams()
  const address = params.address as string
  const [details, setDetails] = useState<NodeDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return

    const fetchDetails = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/pnodes/${address}`)
        if (!response.ok) {
          throw new Error('Failed to fetch node details')
        }
        const data = await response.json()
        if (data.success) {
          setDetails(data.data)
        } else {
          throw new Error(data.error || 'Failed to fetch node details')
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDetails()
  }, [address])

  if (isLoading) {
    return <div className="p-8 text-center">Loading node details...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>
  }

  if (!details) {
    return <div className="p-8 text-center">No details found for this node.</div>
  }

  const { stats, version, geolocation } = details
  const ip = address.split(':')[0]

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Node Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Node Information</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="Gossip Address" value={address} />
              <DetailRow label="RPC Address" value={`${ip}:6000`} />
              <DetailRow label="Version" value={version} />
              <DetailRow label="Uptime" value={formatUptime(stats.uptime)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="Storage Used" value={formatBytes(stats.total_bytes)} />
              <DetailRow label="Storage Capacity" value={formatBytes(stats.file_size)} />
              <DetailRow label="Total Pages" value={stats.total_pages.toLocaleString()} />
              <DetailRow label="Storage Utilization" value={`${((stats.total_bytes / stats.file_size) * 100).toFixed(1)}%`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailRow label="CPU Usage" value={`${stats.cpu_percent.toFixed(1)}%`} />
              <DetailRow label="RAM Usage" value={`${formatBytes(stats.ram_used)} / ${formatBytes(stats.ram_total)}`} />
              <DetailRow label="Active Streams" value={stats.active_streams.toLocaleString()} />
              <DetailRow label="Packets Received/s" value={stats.packets_received.toLocaleString()} />
              <DetailRow label="Packets Sent/s" value={stats.packets_sent.toLocaleString()} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              {geolocation ? (
                <>
                  <DetailRow label="Country" value={geolocation.country} />
                  <DetailRow label="City" value={geolocation.city} />
                  <DetailRow label="Region" value={geolocation.regionName} />
                  <DetailRow label="ISP" value={geolocation.isp} />
                  <DetailRow label="Organization" value={geolocation.org} />
                  <DetailRow label="Coordinates" value={`${geolocation.lat}, ${geolocation.lng}`} />
                </>
              ) : (
                <p>Geolocation data not available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
