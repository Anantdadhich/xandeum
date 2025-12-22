'use client'

import { useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { shortenPubkey } from '@/lib/utils'
// Local type to match current usage and avoid missing imports
interface LegacyPNode {
  pubkey: string
  ip: string
  uptime?: number
  utilizationPercent?: number
  status: 'healthy' | 'degraded' | 'offline'
}
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

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
  const filteredAndSortedNodes = useMemo(() => {
    // Filter
    let filtered = pnodes
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = pnodes.filter(
        (node) =>
          node.pubkey.toLowerCase().includes(query) ||
          node.ip.toLowerCase().includes(query)
      )
    }

    // Sort
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

  const SortIcon = ({ column }: { column: keyof LegacyPNode }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    )
  }

  const getStatusBadge = (status: LegacyPNode['status']) => {
    const variants = {
      healthy: 'default',
      degraded: 'secondary',
      offline: 'destructive',
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  if (filteredAndSortedNodes.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          {searchQuery ? 'No pNodes match your search.' : 'No pNodes available.'}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort('pubkey')}
                className="hover:bg-transparent p-0"
              >
                Public Key
                <SortIcon column="pubkey" />
              </Button>
            </TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort('uptime')}
                className="hover:bg-transparent p-0"
              >
                Uptime
                <SortIcon column="uptime" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort('utilizationPercent')}
                className="hover:bg-transparent p-0"
              >
                Storage Utilization
                <SortIcon column="utilizationPercent" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedNodes.map((node) => (
            <TableRow key={node.pubkey}>
              <TableCell className="font-mono text-sm">
                <span className="hidden lg:inline">{node.pubkey}</span>
                <span className="lg:hidden">{shortenPubkey(node.pubkey)}</span>
              </TableCell>
              <TableCell>{node.ip}</TableCell>
              <TableCell>{typeof node.uptime === 'number' ? node.uptime.toFixed(2) : '-'}%</TableCell>
              <TableCell>{typeof node.utilizationPercent === 'number' ? node.utilizationPercent.toFixed(1) : '-'}%</TableCell>
              <TableCell>{getStatusBadge(node.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}