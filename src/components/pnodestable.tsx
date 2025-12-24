'use client'

import { useMemo } from 'react'
<<<<<<< HEAD
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
=======
import { shortenPubkey } from '@/lib/utils'
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, ExternalLink } from 'lucide-react'

>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
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

<<<<<<< HEAD
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
=======
  const SortButton = ({ column, children }: { column: keyof LegacyPNode; children: React.ReactNode }) => {
    const isActive = sortColumn === column
    return (
      <button
        onClick={() => onSort(column)}
        className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors"
      >
        {children}
        {isActive ? (
          sortDirection === 'asc' ? (
            <ArrowUp className="w-3 h-3" />
          ) : (
            <ArrowDown className="w-3 h-3" />
          )
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-50" />
        )}
      </button>
    )
  }

  const getStatusBadge = (status: LegacyPNode['status']) => {
    const config = {
      healthy: { class: 'status-healthy', text: 'Healthy' },
      degraded: { class: 'status-degraded', text: 'Degraded' },
      offline: { class: 'status-offline', text: 'Offline' },
    }
    const { class: dotClass, text } = config[status]

    return (
      <div className="flex items-center gap-2">
        <span className={`status-dot ${dotClass}`}></span>
        <span className="text-sm capitalize">{text}</span>
      </div>
    )
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (filteredAndSortedNodes.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-[var(--foreground-muted)]">
          {searchQuery ? 'No pNodes match your search.' : 'No pNodes available.'}
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <SortButton column="pubkey">Public Key</SortButton>
              </th>
              <th>IP Address</th>
              <th>
                <SortButton column="uptime">Uptime</SortButton>
              </th>
              <th>
                <SortButton column="utilizationPercent">Storage</SortButton>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedNodes.map((node, index) => (
              <tr
                key={`${node.ip}-${node.pubkey}-${index}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <td>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm text-[var(--foreground-muted)]">
                      <span className="hidden lg:inline">{node.pubkey || '-'}</span>
                      <span className="lg:hidden">{shortenPubkey(node.pubkey)}</span>
                    </code>
                    {node.pubkey && (
                      <button
                        onClick={() => copyToClipboard(node.pubkey)}
                        className="p-1 rounded hover:bg-[var(--card-hover)] text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                        title="Copy pubkey"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <span className="font-mono text-sm">{node.ip}</span>
                </td>
                <td>
                  <span className={`font-semibold ${typeof node.uptime === 'number' && node.uptime > 7
                    ? 'text-[var(--status-healthy)]'
                    : typeof node.uptime === 'number' && node.uptime > 1
                      ? 'text-[var(--status-degraded)]'
                      : 'text-[var(--foreground-muted)]'
                    }`}>
                    {typeof node.uptime === 'number' ? `${node.uptime.toFixed(1)}d` : '-'}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[var(--card-border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent)] rounded-full transition-all"
                        style={{ width: `${Math.min(node.utilizationPercent || 0, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-[var(--foreground-muted)]">
                      {typeof node.utilizationPercent === 'number' ? `${node.utilizationPercent.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                </td>
                <td>
                  {getStatusBadge(node.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
>>>>>>> 7d748f6 (fix: remove console logs with keys error and added dashboard)
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