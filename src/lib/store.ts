import { create } from 'zustand'
import type { DashboardState, EnrichedPNodeInfo, NetworkAnalytics } from '@/types/pnode'

export const useDashboardStore = create<DashboardState>((set, get) => ({
  pnodes: [],
  metrics: null,
  isLoading: true,
  isLoadingMore: false, // For background loading indicator
  error: null,
  lastUpdated: null,
  searchQuery: '',
  sortColumn: 'last_seen_timestamp',
  sortDirection: 'desc',

  setPNodes: (pnodes: EnrichedPNodeInfo[]) =>
    set({
      pnodes,
      lastUpdated: new Date(),
      error: null
    }),

  setMetrics: (metrics: NetworkAnalytics) =>
    set({ metrics }),

  setLoading: (isLoading: boolean) =>
    set({ isLoading }),

  setError: (error: string | null) =>
    set({ error, isLoading: false }),

  setSearchQuery: (searchQuery: string) =>
    set({ searchQuery }),

  setSorting: (column: keyof EnrichedPNodeInfo) => {
    const { sortColumn, sortDirection } = get()
    const newDirection =
      sortColumn === column && sortDirection === 'asc'
        ? 'desc'
        : 'asc'

    set({
      sortColumn: column,
      sortDirection: newDirection
    })
  },

  refreshData: async () => {
    set({ isLoading: true, error: null })

    try {
      // Phase 1: Fetch metrics and first 10 pnodes quickly
      const [metricsResponse, initialPnodesResponse] = await Promise.all([
        fetch('/api/network/overview'),
        fetch('/api/pnodes?limit=10')
      ]);

      if (!metricsResponse.ok) {
        throw new Error(`Failed to fetch network metrics: ${metricsResponse.statusText}`);
      }

      const metricsData = await metricsResponse.json();

      if (!metricsData.success) {
        throw new Error('API returned unsuccessful response for metrics');
      }

      // Set metrics immediately
      set({ metrics: metricsData.data, isLoading: false });

      // Check if initial pnodes loaded
      if (initialPnodesResponse.ok) {
        const initialPnodesData = await initialPnodesResponse.json();
        if (initialPnodesData.success && initialPnodesData.data.length > 0) {
          set({ pnodes: initialPnodesData.data, lastUpdated: new Date() });
        }
      }

      // Phase 2: Fetch all pnodes in background
      set({ isLoadingMore: true });
      const allPnodesResponse = await fetch('/api/pnodes');

      if (allPnodesResponse.ok) {
        const allPnodesData = await allPnodesResponse.json();
        if (allPnodesData.success) {
          set({
            pnodes: allPnodesData.data,
            lastUpdated: new Date(),
            isLoadingMore: false,
            error: null,
          });
        }
      } else {
        set({ isLoadingMore: false });
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Unknown error occurred'

      set({
        error: errorMessage,
        isLoading: false,
        isLoadingMore: false
      })
    }
  },
}));