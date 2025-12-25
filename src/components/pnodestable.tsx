'use client'

import { useMemo, useState } from 'react'
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
import { ArrowUp, ArrowDown, Eye } from 'lucide-react'
import { Pagination } from '@/components/Pagination'

// Local types to match what the dashboard provides
interface LegacyPNode {
  address: string;
  pubkey: string;
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
  itemsPerPage?: number
}

export function PNodesTable({
  pnodes,
  searchQuery,
  sortColumn,
  sortDirection,
  onSort,
  itemsPerPage = 10,
}: PNodesTableProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

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

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Pagination
  const totalItems = filteredAndSortedNodes.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNodes = filteredAndSortedNodes.slice(startIndex, startIndex + itemsPerPage)

  const handleViewDetails = (address: string) => {
    router.push(`/pnodes/${address}`)
  }

  const renderSortIcon = (column: keyof LegacyPNode) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc'
      ? <ArrowUp className="w-3 h-3 inline ml-1" />
      : <ArrowDown className="w-3 h-3 inline ml-1" />
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#1a1a1a] hover:bg-transparent">
            <TableHead
              className="pl-6 uppercase text-xs font-bold text-[#666] cursor-pointer"
              onClick={() => onSort('pubkey')}
            >
              NODE ID {renderSortIcon('pubkey')}
            </TableHead>
            <TableHead className="uppercase text-xs font-bold text-[#666]">IP ADDRESS</TableHead>
            <TableHead
              className="uppercase text-xs font-bold text-[#666] cursor-pointer"
              onClick={() => onSort('uptime')}
            >
              UPTIME {renderSortIcon('uptime')}
            </TableHead>
            <TableHead className="uppercase text-xs font-bold text-[#666]">STATUS</TableHead>
            <TableHead className="uppercase text-xs font-bold text-[#666] text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedNodes.map((node, index) => (
            <TableRow
              key={`${node.address}-${index}`}
              className="border-b border-[#1a1a1a] hover:bg-[#141414] group"
            >
              <TableCell className="pl-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-[#666]">
                    {node.pubkey.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-white text-sm">
                    {shortenPubkey(node.pubkey)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium text-[#888]">
                {node.ip}
              </TableCell>
              <TableCell className="text-sm font-bold text-white">
                {typeof node.uptime === 'number' ? `${node.uptime.toFixed(1)} days` : '-'}
              </TableCell>
              <TableCell>
                <StatusPill status={node.status} />
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={() => handleViewDetails(node.address)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] text-xs font-semibold hover:bg-[var(--accent)] hover:text-black transition-all group-hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="px-6 border-t border-[#1a1a1a]">
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {filteredAndSortedNodes.length === 0 && (
        <div className="p-8 text-center text-[#666] text-sm">
          No nodes found matching filters.
        </div>
      )}
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  if (status === 'healthy') {
    return (
      <span className="inline-flex items-center rounded-md bg-[#0a2015] px-2.5 py-1 text-xs font-medium text-[#00FFAA] border border-[#00FFAA]/20">
        Active
      </span>
    )
  } else if (status === 'degraded') {
    return (
      <span className="inline-flex items-center rounded-md bg-[#201a0a] px-2.5 py-1 text-xs font-medium text-[#FFB800] border border-[#FFB800]/20">
        Degraded
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#200a0a] px-2.5 py-1 text-xs font-medium text-[#FF2D55] border border-[#FF2D55]/20">
      Offline
    </span>
  )
}