import React, { useState, useEffect } from 'react';
import { Download, Calendar, RefreshCw, Settings, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface ActionItem {
  label: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
  status?: 'idle' | 'loading' | 'success' | 'error';
  enabled?: boolean;
}

const QuickActions: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<'online' | 'offline' | 'maintenance'>('online');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [actionStates, setActionStates] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({});
  const [dataHealth, setDataHealth] = useState(100);

  // System health check (simplified)
  const checkSystemHealth = async () => {
    try {
      const healthChecks = await Promise.allSettled([
        fetch('https://dummyjson.com/test').then(r => r.ok),
        Promise.resolve(Math.random() > 0.1) // 90% uptime simulation
      ]);

      const successRate = healthChecks.filter(check => 
        check.status === 'fulfilled' && check.value === true
      ).length / healthChecks.length * 100;

      setDataHealth(successRate);
      setSystemStatus(successRate >= 80 ? 'online' : successRate >= 50 ? 'maintenance' : 'offline');
    } catch {
      setSystemStatus('offline');
      setDataHealth(0);
    }
  };

  // Update action status with auto-reset
  const updateActionStatus = (label: string, status: 'loading' | 'success' | 'error') => {
    setActionStates(prev => ({ ...prev, [label]: status }));
    if (status !== 'loading') {
      setTimeout(() => setActionStates(prev => ({ ...prev, [label]: 'idle' })), 3000);
    }
  };

  // Export functionality
  const handleExportReport = async () => {
    updateActionStatus('Export Report', 'loading');
    
    try {
      const [usersRes, productsRes] = await Promise.all([
        fetch('https://dummyjson.com/users?limit=10'),
        fetch('https://dummyjson.com/products?limit=10')
      ]);

      const [users, products] = await Promise.all([
        usersRes.json(),
        productsRes.json()
      ]);

      const csvData = `Report Generated: ${new Date().toISOString()}
Users Count: ${users.total || 0}
Products Count: ${products.total || 0}
System Health: ${dataHealth}%`;

      // Create and download CSV
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      updateActionStatus('Export Report', 'success');
    } catch {
      updateActionStatus('Export Report', 'error');
    }
  };

  // Schedule functionality
  const handleScheduleReport = () => {
    updateActionStatus('Schedule Report', 'loading');
    
    setTimeout(() => {
      const scheduleTime = new Date();
      scheduleTime.setHours(scheduleTime.getHours() + 24);
      alert(`Report scheduled for: ${scheduleTime.toLocaleDateString()} at ${scheduleTime.toLocaleTimeString()}`);
      updateActionStatus('Schedule Report', 'success');
    }, 1500);
  };

  // Refresh functionality
  const handleRefreshData = async () => {
    updateActionStatus('Refresh Data', 'loading');
    setLastRefresh(new Date());
    
    try {
      await checkSystemHealth();
      window.dispatchEvent(new CustomEvent('refreshDashboard'));
      updateActionStatus('Refresh Data', 'success');
    } catch {
      updateActionStatus('Refresh Data', 'error');
    }
  };

  // Settings functionality
  const handleViewSettings = () => {
    updateActionStatus('View Settings', 'loading');
    setTimeout(() => {
      alert('Settings panel would open here.\n\nAvailable options:\n- API Configuration\n- Refresh Intervals\n- Export Formats\n- Theme Settings');
      updateActionStatus('View Settings', 'success');
    }, 500);
  };

  const actions: ActionItem[] = [
    { 
      label: 'Export Report', 
      icon: Download, 
      color: 'bg-blue-600',
      onClick: handleExportReport,
      status: actionStates['Export Report'] || 'idle',
      enabled: systemStatus !== 'offline'
    },
    { 
      label: 'Schedule Report', 
      icon: Calendar, 
      color: 'bg-purple-600',
      onClick: handleScheduleReport,
      status: actionStates['Schedule Report'] || 'idle',
      enabled: true
    },
    { 
      label: 'Refresh Data', 
      icon: RefreshCw, 
      color: 'bg-green-600',
      onClick: handleRefreshData,
      status: actionStates['Refresh Data'] || 'idle',
      enabled: true
    },
    { 
      label: 'View Settings', 
      icon: Settings, 
      color: 'bg-gray-600',
      onClick: handleViewSettings,
      status: actionStates['View Settings'] || 'idle',
      enabled: true
    }
  ];

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Status icon helper
  const getStatusIcon = (status: string) => {
    const icons = {
      loading: <RefreshCw className="h-3 w-3 animate-spin" />,
      success: <CheckCircle className="h-3 w-3" />,
      error: <AlertCircle className="h-3 w-3" />
    };
    return icons[status as keyof typeof icons] || null;
  };

  // System status color helper
  const getStatusColor = () => {
    const colors = {
      online: 'bg-green-400',
      maintenance: 'bg-yellow-400',
      offline: 'bg-red-400'
    };
    return colors[systemStatus];
  };

  // Health bar color helper
  const getHealthBarColor = () => {
    if (dataHealth >= 80) return 'bg-green-500';
    if (dataHealth >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-900   border border-gray-700 rounded-lg p-6 cursor-pointer  hover:border-blue-500 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
          <span className="text-xs text-gray-400">{systemStatus}</span>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={!action.enabled || action.status === 'loading'}
            className={`${action.color} ${
              !action.enabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80 hover:scale-105'
            } text-white p-3 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2 group relative`}
          >
            {/* Status Indicator */}
            {action.status !== 'idle' && (
              <div className="absolute -top-1 -right-1">
                <div className={`p-1 rounded-full text-xs ${
                  action.status === 'loading' ? 'bg-blue-500' :
                  action.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {getStatusIcon(action.status || 'idle')}
                </div>
              </div>
            )}

            <action.icon className={`h-5 w-5 transition-transform duration-200 ${
              action.status === 'loading' ? 'animate-pulse' : 'group-hover:scale-110'
            }`} />
            <span className="text-xs font-medium text-center">{action.label}</span>
            
            {/* Last Refresh Time (only for Refresh Data) */}
            {action.label === 'Refresh Data' && lastRefresh && (
              <div className="flex items-center text-xs opacity-70">
                <Clock className="h-3 w-3 mr-1" />
                {lastRefresh.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* System Health Bar */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-400">System Health</span>
          <span className="text-xs text-white font-medium">{dataHealth.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${getHealthBarColor()}`}
            style={{ width: `${dataHealth}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickActions;