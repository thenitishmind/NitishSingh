export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  reviews?: Review[];
  // Enhanced live data properties
  live_metrics?: {
    uptime: number;
    response_time: number;
    last_deployment: string;
    status: 'active' | 'maintenance' | 'error';
    visitors_today: number;
    performance_score: number;
  };
  tech_stack?: string[];
  features?: string[];
  demo_available?: boolean;
  analytics?: {
    views: number;
    clicks: number;
    stars_trend: number;
    recent_commits: number;
    contributors: number;
    issues: {
      open: number;
      closed: number;
    };
    pull_requests: {
      open: number;
      merged: number;
    };
    deployments: {
      total: number;
      successful: number;
      failed: number;
      last_deployed: string;
    };
  };
}

export interface Review {
  author: string;
  text: string;
  rating: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
} 

export type ProjectReviewKey = "portfolio-website" | "e-commerce-app" | "tableCraft";

// Live data types for real-time updates
export interface LiveMetrics {
  timestamp: string;
  uptime: number;
  response_time: number;
  status: 'active' | 'maintenance' | 'error' | 'deploying';
  concurrent_users: number;
  api_calls_today: number;
  error_rate: number;
  performance_score: number;
}

export interface DeploymentInfo {
  id: string;
  status: 'building' | 'ready' | 'error' | 'canceled';
  url: string;
  created_at: string;
  duration: number;
  commit_sha: string;
  commit_message: string;
  branch: string;
}

export interface ProjectHealth {
  overall_status: 'healthy' | 'warning' | 'critical';
  last_check: string;
  uptime_24h: number;
  avg_response_time: number;
  ssl_certificate: {
    valid: boolean;
    expires_at: string;
  };
  lighthouse_score: {
    performance: number;
    accessibility: number;
    best_practices: number;
    seo: number;
    last_audit: string;
  };
}