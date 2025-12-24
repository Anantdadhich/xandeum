'use client'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalItems: number
    itemsPerPage: number
    onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    if (totalItems === 0) return null

    return (
        <div className="flex items-center justify-between py-4 px-2">
            {/* Info */}
            <div className="text-sm text-[var(--foreground-muted)]">
                Showing <span className="text-white font-semibold">{startItem}</span>-
                <span className="text-white font-semibold">{endItem}</span> of{' '}
                <span className="text-[var(--accent)] font-semibold">{totalItems}</span>
            </div>

            {/* Page Controls */}
            {totalPages > 1 && (
                <div className="flex items-center gap-1">
                    {/* First page */}
                    <button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                        title="First page"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Previous */}
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-btn"
                        title="Previous page"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 mx-2">
                        {generatePageNumbers(currentPage, totalPages).map((page, index) => (
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-2 text-[var(--foreground-muted)] text-sm">•••</span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page as number)}
                                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Next */}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                        title="Next page"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last page */}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                        title="Last page"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    )
}

function generatePageNumbers(current: number, total: number): (number | string)[] {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    if (current <= 3) {
        pages.push(1, 2, 3, 4, '...', total)
    } else if (current >= total - 2) {
        pages.push(1, '...', total - 3, total - 2, total - 1, total)
    } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }

    return pages
}

// Simple version showing just count
interface SimplePaginationProps {
    showing: number
    total: number
}

export function SimplePagination({ showing, total }: SimplePaginationProps) {
    return (
        <div className="text-center text-sm text-[var(--foreground-muted)] py-4 border-t border-[var(--card-border)]">
            Showing <span className="text-white font-semibold">{showing}</span> of{' '}
            <span className="text-[var(--accent)] font-semibold">{total}</span> nodes
        </div>
    )
}
