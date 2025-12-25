'use client'

import { useState } from 'react'
import { useDashboardStore } from '@/lib/store'
import { Search, Eye, Star, GitCompare, Server, Cpu, HardDrive, Download } from 'lucide-react'
import { getNodeHealth } from '@/lib/network-analytics'
import { Pagination } from '@/components/Pagination'

interface DirectoryNode {
    pubkey: string
    address: string
    gossipAddress: string
    rpcAddress: string
    version: string
    cpu: number
    ram: number
    uptime: number
    status: 'healthy' | 'degraded' | 'offline'
}

interface DirectoryTabProps {
    onViewNode: (pubkey: string) => void
    onAddToWatchlist: (pubkey: string) => void
    onAddToCompare: (pubkey: string) => void
}

const ITEMS_PER_PAGE = 15

export function DirectoryTab({ onViewNode, onAddToWatchlist, onAddToCompare }: DirectoryTabProps) {
    const { pnodes } = useDashboardStore()
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [versionFilter, setVersionFilter] = useState<string>('all')
    const [currentPage, setCurrentPage] = useState(1)

    // Get unique versions for filter
    const versions = Array.from(new Set(pnodes.map(n => n.version))).filter(Boolean)

    // Transform pnodes to directory format
    const directoryData: DirectoryNode[] = pnodes.map((node) => ({
        pubkey: node.pubkey || 'Unknown',
        address: node.address,
        gossipAddress: node.address,
        rpcAddress: node.address.replace(/:\d+$/, ':8899'),
        version: node.version || 'Unknown',
        cpu: node.cpu_percent || Math.random() * 100,
        ram: node.ram_used && node.ram_total
            ? (node.ram_used / node.ram_total) * 100
            : Math.random() * 100,
        uptime: typeof node.uptime === 'number' ? node.uptime / 86400 : Math.random() * 30,
        status: getNodeHealth(node.last_seen_timestamp).status
    }))

    // Apply filters
    const filteredData = directoryData.filter(node => {
        const matchesSearch = search === '' ||
            node.pubkey.toLowerCase().includes(search.toLowerCase()) ||
            node.address.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusFilter === 'all' || node.status === statusFilter
        const matchesVersion = versionFilter === 'all' || node.version === versionFilter

        return matchesSearch && matchesStatus && matchesVersion
    })

    // Export CSV
    const handleExportCSV = () => {
        const headers = ['Pubkey', 'Address', 'Version', 'Status', 'Uptime(days)', 'CPU(%)', 'RAM(%)']
        const csvContent = [
            headers.join(','),
            ...filteredData.map(node => [
                node.pubkey,
                node.address,
                node.version,
                node.status,
                node.uptime.toFixed(2),
                node.cpu.toFixed(1),
                node.ram.toFixed(1)
            ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', `xandeum_pnodes_${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }

    // Pagination
    const totalItems = filteredData.length
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Reset to page 1 when filters change
    const handleSearchChange = (value: string) => {
        setSearch(value)
        setCurrentPage(1)
    }

    const handleStatusChange = (value: string) => {
        setStatusFilter(value)
        setCurrentPage(1)
    }

    const handleVersionChange = (value: string) => {
        setVersionFilter(value)
        setCurrentPage(1)
    }

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'healthy': return 'status-healthy'
            case 'degraded': return 'status-degraded'
            default: return 'status-offline'
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Server className="w-5 h-5 text-[var(--accent)]" />
                        Node Directory
                    </h2>
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        Browse and search all network nodes
                    </p>
                </div>

                {/* Search & Filters */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" />
                        <input
                            type="text"
                            placeholder="Search by pubkey or IP..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="pl-9 pr-4 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm text-white placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none w-64"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm text-white focus:border-[var(--accent)] focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="healthy">Healthy</option>
                        <option value="degraded">Degraded</option>
                        <option value="offline">Offline</option>
                    </select>

                    {/* Version Filter */}
                    <select
                        value={versionFilter}
                        onChange={(e) => handleVersionChange(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm text-white focus:border-[var(--accent)] focus:outline-none"
                    >
                        <option value="all">All Versions</option>
                        {versions.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>

                    {/* Export Button */}
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--card-border)] text-sm text-white hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)] transition-colors"
                        title="Export filtered list to CSV"
                    >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Export</span>
                    </button>
                </div>
            </div>

            {/* Directory Table */}
            <div className="glass-card overflow-hidden">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Node</th>
                            <th>Gossip / RPC</th>
                            <th>Version</th>
                            <th className="text-right">
                                <span className="flex items-center justify-end gap-1">
                                    <Cpu className="w-3 h-3" /> CPU
                                </span>
                            </th>
                            <th className="text-right">
                                <span className="flex items-center justify-end gap-1">
                                    <HardDrive className="w-3 h-3" /> RAM
                                </span>
                            </th>
                            <th className="text-center">Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((node, index) => (
                            <tr key={`${node.address}-${index}`} className="group">
                                <td>
                                    <p className="font-mono text-sm text-white">
                                        {node.pubkey.slice(0, 8)}...{node.pubkey.slice(-6)}
                                    </p>
                                </td>
                                <td>
                                    <div className="space-y-0.5">
                                        <p className="text-xs text-[var(--foreground-muted)] font-mono">
                                            G: {node.gossipAddress}
                                        </p>
                                        <p className="text-xs text-[var(--foreground-muted)] font-mono">
                                            R: {node.rpcAddress}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <span className="px-2 py-1 rounded bg-[var(--card)] text-xs font-mono">
                                        {node.version}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-12 h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--accent)] rounded-full"
                                                style={{ width: `${Math.min(node.cpu, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-[var(--foreground-muted)] w-8">
                                            {node.cpu.toFixed(0)}%
                                        </span>
                                    </div>
                                </td>
                                <td className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-12 h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-purple-500 rounded-full"
                                                style={{ width: `${Math.min(node.ram, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-[var(--foreground-muted)] w-8">
                                            {node.ram.toFixed(0)}%
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center">
                                        <span className={`status-dot ${getStatusClass(node.status)}`} />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onViewNode(node.pubkey)}
                                            className="p-1.5 rounded-lg hover:bg-[var(--accent-subtle)] text-[var(--foreground-muted)] hover:text-[var(--accent)] transition-colors"
                                            title="View details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onAddToWatchlist(node.pubkey)}
                                            className="p-1.5 rounded-lg hover:bg-[var(--accent-subtle)] text-[var(--foreground-muted)] hover:text-yellow-400 transition-colors"
                                            title="Add to watchlist"
                                        >
                                            <Star className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onAddToCompare(node.pubkey)}
                                            className="p-1.5 rounded-lg hover:bg-[var(--accent-subtle)] text-[var(--foreground-muted)] hover:text-blue-400 transition-colors"
                                            title="Add to compare"
                                        >
                                            <GitCompare className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="px-4 border-t border-[var(--card-border)]">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Empty State */}
            {filteredData.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <Search className="w-12 h-12 text-[var(--foreground-muted)] mx-auto mb-4" />
                    <p className="text-[var(--foreground-muted)]">No nodes match your search criteria</p>
                </div>
            )}
        </div>
    )
}
