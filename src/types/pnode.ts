export interface PNodeInfo {
  address: string;
  last_seen_timestamp: number;
  pubkey: string | null;
  version: string;
}

export interface PNodeStats {
  active_streams: number;
  cpu_percent: number;
  current_index: number;
  file_size: number;
  last_updated: number;
  packets_received: number;
  packets_sent: number;
  ram_total: number;
  ram_used: number;
  total_bytes: number;
  total_pages: number;
  uptime: number;
}

export interface PNodeListResponse {
  pods: PNodeInfo[];
  total_count: number;
}


export type NodeHealth = "healthy" | "degraded" | "offline";

export interface NetworkAnalytics {
  totals: {
    total: number;
    healthy: number;
    degraded: number;
    offline: number;
  };
  health: {
    score: number;
    healthyPercentage: number;
    degradedPercentage: number;
    offlinePercentage: number;
  };
  versions: {
    latest: string;
    distribution: Record<string, number>;
    outdatedCount: number;
    outdatedPercentage: number;
  };
  storage: {
    totalCapacity: number;
    totalUsed: number;
    averagePerNode: number;
    utilizationPercentage: number;
  };
  performance: {
    averageCPU: number;
    averageRAM: number;
    averageUptime: number;
  };
  risks: {
    singleVersionDominance: boolean;
    lowHealthNodes: number;
    staleNodes: number;
  };
}


export interface EnrichedPNodeInfo extends PNodeInfo, Partial<PNodeStats> { }


export interface DashboardState {
  pnodes: EnrichedPNodeInfo[];
  metrics: NetworkAnalytics | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  lastUpdated: Date | null;
  searchQuery: string;
  sortColumn: keyof EnrichedPNodeInfo | null;
  sortDirection: 'asc' | 'desc';

  setPNodes: (pnodes: EnrichedPNodeInfo[]) => void;
  setMetrics: (metrics: NetworkAnalytics) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSorting: (column: keyof EnrichedPNodeInfo) => void;
  refreshData: () => Promise<void>;
}