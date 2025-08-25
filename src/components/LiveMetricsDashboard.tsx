import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaServer, 
  FaClock, 
  FaUsers, 
  FaChartLine, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTimesCircle,
  FaRocket,
  FaCode,
  FaGlobe
} from 'react-icons/fa';
import { LiveMetrics, ProjectHealth } from '@/types';

interface LiveMetricsDashboardProps {
  projectId: string;
  projectName: string;
  className?: string;
}

const LiveMetricsDashboard: React.FC<LiveMetricsDashboardProps> = ({
  projectId,
  projectName,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<LiveMetrics | null>(null);
  const [health, setHealth] = useState<ProjectHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock data for demonstration
  useEffect(() => {
    const generateMockData = () => {
      const newMetrics: LiveMetrics = {
        timestamp: new Date().toISOString(),
        uptime: 99.9,
        response_time: Math.floor(Math.random() * 100) + 80,
        status: Math.random() > 0.1 ? 'active' : 'error',
        concurrent_users: Math.floor(Math.random() * 25) + 5,
        api_calls_today: Math.floor(Math.random() * 500) + 200,
        error_rate: Math.random() * 1.5,
        performance_score: Math.floor(Math.random() * 15) + 85,
      };

      const newHealth: ProjectHealth = {
        overall_status: newMetrics.status === 'active' ? 'healthy' : 'warning',
        last_check: new Date().toISOString(),
        uptime_24h: newMetrics.uptime,
        avg_response_time: newMetrics.response_time,
        ssl_certificate: {
          valid: true,
          expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        },
        lighthouse_score: {
          performance: Math.floor(Math.random() * 10) + 90,
          accessibility: Math.floor(Math.random() * 10) + 90,
          best_practices: Math.floor(Math.random() * 10) + 90,
          seo: Math.floor(Math.random() * 10) + 90,
          last_audit: new Date().toISOString(),
        },
      };

      setMetrics(newMetrics);
      setHealth(newHealth);
      setLastUpdate(new Date());
      setLoading(false);
    };

    // Initial load
    generateMockData();

    // Update every 30 seconds
    const interval = setInterval(generateMockData, 30000);

    return () => clearInterval(interval);
  }, [projectId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'healthy':
        return <FaCheckCircle className="text-green-400" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-400" />;
      case 'error':
      case 'critical':
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-gray-400" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <FaServer className="text-blue-400 text-lg" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{projectName} - Live Metrics</h3>
            <p className="text-sm text-gray-400">
              Last updated: {formatTime(lastUpdate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon(metrics?.status || 'unknown')}
          <span className={`text-sm font-medium ${getStatusColor(metrics?.status || 'unknown')}`}>
            {metrics?.status?.toUpperCase() || 'UNKNOWN'}
          </span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-blue-600/10 backdrop-blur-sm p-4 rounded-xl border border-blue-500/20"
        >
          <div className="flex items-center space-x-2 mb-2">
            <FaClock className="text-blue-400 text-sm" />
            <span className="text-blue-400 text-xs font-medium">Response Time</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics?.response_time || 0}
            <span className="text-sm text-gray-400 ml-1">ms</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-600/10 backdrop-blur-sm p-4 rounded-xl border border-green-500/20"
        >
          <div className="flex items-center space-x-2 mb-2">
            <FaCheckCircle className="text-green-400 text-sm" />
            <span className="text-green-400 text-xs font-medium">Uptime</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics?.uptime || 0}
            <span className="text-sm text-gray-400 ml-1">%</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-600/10 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20"
        >
          <div className="flex items-center space-x-2 mb-2">
            <FaUsers className="text-purple-400 text-sm" />
            <span className="text-purple-400 text-xs font-medium">Users Online</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics?.concurrent_users || 0}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-600/10 backdrop-blur-sm p-4 rounded-xl border border-orange-500/20"
        >
          <div className="flex items-center space-x-2 mb-2">
            <FaChartLine className="text-orange-400 text-sm" />
            <span className="text-orange-400 text-xs font-medium">Performance</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics?.performance_score || 0}
            <span className="text-sm text-gray-400 ml-1">/100</span>
          </div>
        </motion.div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">API Calls Today</span>
            <FaCode className="text-gray-400 text-sm" />
          </div>
          <div className="text-xl font-bold text-white">
            {metrics?.api_calls_today?.toLocaleString() || '0'}
          </div>
        </div>

        <div className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Error Rate</span>
            <FaExclamationTriangle className="text-gray-400 text-sm" />
          </div>
          <div className="text-xl font-bold text-white">
            {metrics?.error_rate?.toFixed(2) || '0.00'}
            <span className="text-sm text-gray-400 ml-1">%</span>
          </div>
        </div>

        <div className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Deployment Status</span>
            <FaRocket className="text-gray-400 text-sm" />
          </div>
          <div className="text-xl font-bold text-green-400">
            Ready
          </div>
        </div>
      </div>

      {/* Lighthouse Scores */}
      {health?.lighthouse_score && (
        <div className="bg-gray-700/20 backdrop-blur-sm p-4 rounded-xl border border-gray-600/20">
          <div className="flex items-center space-x-2 mb-3">
            <FaGlobe className="text-cyan-400 text-sm" />
            <span className="text-cyan-400 text-sm font-medium">Lighthouse Scores</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(health.lighthouse_score).map(([key, value]) => {
              if (key === 'last_audit') return null;
              return (
                <div key={key} className="text-center">
                  <div className="text-lg font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    {key.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LiveMetricsDashboard;
