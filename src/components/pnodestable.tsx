'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { shortenPubkey } from '@/lib/utils'
import { ArrowUp, ArrowDown } from 'lucide-react'

// Local types to match what the dashboard provides
interface LegacyPNode {
  pubkey: string
  ip: string
  uptime?: number
  utilizationPercent?: number
  status: 'healthy' | 'degraded' | 'offline'
}

interface PNodesTableProps {
  pnodes: LegacyPNode[]
  searchQuery: string
  sortColumn: keyof LegacyPNode | null
  sortDirection: 'asc' | 'desc'
  onSort: (column: keyof LegacyPNode) => void
}

export function PNodesTable({
  pnodes,
  searchQuery,
  sortColumn,
  sortDirection,
  onSort,
}: PNodesTableProps) {
  const router = useRouter()

  const filteredAndSortedNodes = useMemo(() => {
    let filtered = pnodes
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = pnodes.filter(
        (node) =>
          node.pubkey.toLowerCase().includes(query) ||
          node.ip.toLowerCase().includes(query)
      )
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
        }
        const aStr = String(aVal)
        const bStr = String(bVal)
        return sortDirection === 'asc'
          ? aStr.localeCompare(bStr)
          : bStr.localeCompare(aStr)
      })
    }
    return filtered
  }, [pnodes, searchQuery, sortColumn, sortDirection])

  const handleRowClick = (address: string) => {
    router.push(`/pnodes/${address}`)
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-slate-100 hover:bg-transparent">
            <TableHead
              className="pl-6 uppercase text-xs font-bold text-slate-400 cursor-pointer"
              onClick={() => onSort('pubkey')}
            >
              NODE ID
            </TableHead>
            <TableHead className="uppercase text-xs font-bold text-slate-400">IP ADDRESS</TableHead>
            <TableHead
              className="uppercase text-xs font-bold text-slate-400 cursor-pointer"
              onClick={() => onSort('uptime')}
            >
              UPTIME
            </TableHead>
            <TableHead className="uppercase text-xs font-bold text-slate-400">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedNodes.map((node) => (
            <TableRow
              key={node.pubkey}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleRowClick(node.pubkey)}
            >
              <TableCell className="pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                    {node.pubkey.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-700 text-sm">
                    {shortenPubkey(node.pubkey)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-500">
                {node.ip}
              </TableCell>
              <TableCell className="text-sm font-bold text-slate-700">
                {typeof node.uptime === 'number' ? `${node.uptime.toFixed(1)}%` : '-'}
              </TableCell>
              <TableCell>
                <StatusPill status={node.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredAndSortedNodes.length === 0 && (
        <div className="p-8 text-center text-slate-400 text-sm">
          No nodes found matching filters.
        </div>
      )}
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  if (status === 'healthy') {
    return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
  } else if (status === 'degraded') {
    return <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Degraded</span>
  }
  return <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Offline</span>
}