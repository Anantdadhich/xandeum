import { create } from 'zustand'
import type { DashboardState, EnrichedPNodeInfo, NetworkAnalytics } from '@/types/pnode'

export const useDashboardStore = create<DashboardState>((set, get) => ({
  pnodes: [],
  metrics: null,
  isLoading: true, 
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
      const [pnodesResponse, metricsResponse] = await Promise.all([
        fetch('/api/pnodes'),
        fetch('/api/network/overview')
      ]);

      if (!pnodesResponse.ok) {
        throw new Error(`Failed to fetch pNodes: ${pnodesResponse.statusText}`);
      }
      if (!metricsResponse.ok) {
        throw new Error(`Failed to fetch network metrics: ${metricsResponse.statusText}`);
      }
      
      const pnodesData = await pnodesResponse.json();
      const metricsData = await metricsResponse.json();
      
      if (!pnodesData.success || !metricsData.success) {
        throw new Error('API returned unsuccessful response');
      }

      set({
        pnodes: pnodesData.data,
        metrics: metricsData.data,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
      })
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred'
      
      console.error("Error refreshing dashboard data:", errorMessage);
      set({ 
        error: errorMessage, 
        isLoading: false 
      })
    }
  },
}));