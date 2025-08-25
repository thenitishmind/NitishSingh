// Service for managing live project data and real-time updates
import { Project, LiveMetrics, DeploymentInfo, ProjectHealth } from '@/types';

class LiveDataService {
  private baseUrl: string;
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_APP_URL || 'https://nitish-singh.vercel.app'
      : 'http://localhost:3000';
  }

  // Check if cached data is still valid
  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.cacheTimeout;
  }

  // Get cached data or fetch new data
  private async getCachedOrFetch<T>(
    key: string, 
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data as T;
    }

    try {
      const data = await fetchFn();
      this.cache.set(key, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      // Return cached data if available, even if expired
      if (cached) {
        console.warn(`Using expired cache for ${key} due to fetch error:`, error);
        return cached.data as T;
      }
      throw error;
    }
  }

  // Fetch all projects with live data
  async getProjects(): Promise<Project[]> {
    return this.getCachedOrFetch('all-projects', async () => {
      const response = await fetch(`${this.baseUrl}/api/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
  }

  // Fetch specific project details
  async getProjectDetails(name: string): Promise<Project> {
    return this.getCachedOrFetch(`project-${name}`, async () => {
      const response = await fetch(`${this.baseUrl}/api/projects/${encodeURIComponent(name)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    });
  }

  // Fetch live metrics for a project
  async getLiveMetrics(projectId: string): Promise<LiveMetrics> {
    return this.getCachedOrFetch(`metrics-${projectId}`, async () => {
      const response = await fetch(`${this.baseUrl}/api/metrics/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        // Return mock data if API fails
        return this.generateMockMetrics();
      }

      return response.json();
    });
  }

  // Fetch deployment information
  async getDeployments(projectId: string): Promise<DeploymentInfo[]> {
    return this.getCachedOrFetch(`deployments-${projectId}`, async () => {
      const response = await fetch(`${this.baseUrl}/api/deployments/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        // Return mock deployments if API fails
        return this.generateMockDeployments();
      }

      return response.json();
    });
  }

  // Fetch project health status
  async getProjectHealth(projectId: string): Promise<ProjectHealth> {
    return this.getCachedOrFetch(`health-${projectId}`, async () => {
      const response = await fetch(`${this.baseUrl}/api/health/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        // Return mock health data if API fails
        return this.generateMockHealth();
      }

      return response.json();
    });
  }

  // Setup real-time updates using Server-Sent Events
  setupRealTimeUpdates(
    projectId: string, 
    onUpdate: (data: LiveMetrics) => void
  ): EventSource | null {
    if (typeof EventSource === 'undefined') {
      console.warn('EventSource not supported');
      return null;
    }

    const eventSource = new EventSource(
      `${this.baseUrl}/api/realtime/${projectId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onUpdate(data);
        
        // Update cache with real-time data
        this.cache.set(`metrics-${projectId}`, {
          data,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error('Error parsing real-time data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Real-time connection error:', error);
      eventSource.close();
    };

    return eventSource;
  }

  // Mock data generators for fallback
  private generateMockMetrics(): LiveMetrics {
    return {
      timestamp: new Date().toISOString(),
      uptime: 99.9,
      response_time: Math.floor(Math.random() * 200) + 50,
      status: Math.random() > 0.1 ? 'active' : 'error',
      concurrent_users: Math.floor(Math.random() * 50) + 1,
      api_calls_today: Math.floor(Math.random() * 1000) + 100,
      error_rate: Math.random() * 2,
      performance_score: Math.floor(Math.random() * 20) + 80,
    };
  }

  private generateMockDeployments(): DeploymentInfo[] {
    const deployments: DeploymentInfo[] = [];
    const statuses: DeploymentInfo['status'][] = ['ready', 'ready', 'ready', 'building', 'error'];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      deployments.push({
        id: `deploy-${i}`,
        status: statuses[i],
        url: `https://deployment-${i}.vercel.app`,
        created_at: date.toISOString(),
        duration: Math.floor(Math.random() * 300) + 30,
        commit_sha: Math.random().toString(36).substring(2, 9),
        commit_message: `Update project functionality ${i + 1}`,
        branch: i === 0 ? 'main' : `feature/update-${i}`,
      });
    }
    
    return deployments;
  }

  private generateMockHealth(): ProjectHealth {
    const isHealthy = Math.random() > 0.2;
    
    return {
      overall_status: isHealthy ? 'healthy' : Math.random() > 0.5 ? 'warning' : 'critical',
      last_check: new Date().toISOString(),
      uptime_24h: isHealthy ? 99.9 : Math.random() * 20 + 80,
      avg_response_time: Math.floor(Math.random() * 200) + 50,
      ssl_certificate: {
        valid: true,
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
      lighthouse_score: {
        performance: Math.floor(Math.random() * 20) + 80,
        accessibility: Math.floor(Math.random() * 20) + 80,
        best_practices: Math.floor(Math.random() * 20) + 80,
        seo: Math.floor(Math.random() * 20) + 80,
        last_audit: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    };
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Export singleton instance
export const liveDataService = new LiveDataService();

// React hook for using live data
export function useLiveData() {
  return {
    getProjects: () => liveDataService.getProjects(),
    getProjectDetails: (name: string) => liveDataService.getProjectDetails(name),
    getLiveMetrics: (projectId: string) => liveDataService.getLiveMetrics(projectId),
    getDeployments: (projectId: string) => liveDataService.getDeployments(projectId),
    getProjectHealth: (projectId: string) => liveDataService.getProjectHealth(projectId),
    setupRealTimeUpdates: (projectId: string, onUpdate: (data: LiveMetrics) => void) =>
      liveDataService.setupRealTimeUpdates(projectId, onUpdate),
    clearCache: () => liveDataService.clearCache(),
    getCacheStats: () => liveDataService.getCacheStats(),
  };
}
