import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, TrendingUp, TrendingDown, MoreVertical, Download, RefreshCw, Calendar } from 'lucide-react';

interface DeviceData {
  id: string;
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
  change: number;
  sessions: number;
  bounceRate: number;
  avgDuration: string;
  conversionRate: number;
  trend: 'up' | 'down' | 'stable';
  topModels: { model: string; percentage: number }[];
}

interface Props {
  timeRange?: '24h' | '7d' | '30d' | '90d';
  onTimeRangeChange?: (range: string) => void;
  showDetailed?: boolean;
}

const DeviceAnalytics: React.FC<Props> = ({ timeRange = '30d', onTimeRangeChange, showDetailed = false }) => {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [viewMode, setViewMode] = useState<'percentage' | 'sessions' | 'detailed'>('percentage');
  const [error, setError] = useState<string | null>(null);

  const mockData: DeviceData[] = [
    
    {
      id: 'desktop', name: 'Desktop', value: 52.3, icon: Monitor, color: 'text-blue-400',
      change: 2.1, sessions: 12847, bounceRate: 32.5, avgDuration: '4:32', conversionRate: 3.8, trend: 'up',
      topModels: [{ model: 'Windows PC', percentage: 68.2 }, { model: 'MacBook', percentage: 24.1 }, { model: 'Linux', percentage: 7.7 }]
    },
    {
      id: 'mobile', name: 'Mobile', value: 35.7, icon: Smartphone, color: 'text-green-400',
      change: -1.8, sessions: 8742, bounceRate: 45.2, avgDuration: '2:18', conversionRate: 2.1, trend: 'down',
      topModels: [{ model: 'iPhone', percentage: 58.3 }, { model: 'Samsung', percentage: 28.9 }, { model: 'Other Android', percentage: 12.8 }]
    },
    {
      id: 'tablet', name: 'Tablet', value: 12.0, icon: Tablet, color: 'text-purple-400',
      change: 0.3, sessions: 2941, bounceRate: 38.7, avgDuration: '3:45', conversionRate: 2.9, trend: 'stable',
      topModels: [{ model: 'iPad', percentage: 72.4 }, { model: 'Samsung Tab', percentage: 18.6 }, { model: 'Other Tablets', percentage: 9.0 }]
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDevices(mockData);
      } catch (err) {
        setError('Failed to load device analytics');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDevices([...mockData]);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting as ${format}`);
    setShowDropdown(false);
  };

  const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();

  const getProgressColor = (color: string) => {
    if (color.includes('blue')) return 'bg-blue-500';
    if (color.includes('green')) return 'bg-green-500';
    return 'bg-purple-500';
  };

  const renderValue = (device: DeviceData) => {
    switch (viewMode) {
      case 'sessions': return <p className="text-white font-semibold">{formatNumber(device.sessions)}</p>;
      case 'detailed': return (
        <div className="text-right">
          <p className="text-white font-semibold">{device.value}%</p>
          <p className="text-xs text-gray-400">{formatNumber(device.sessions)} sessions</p>
        </div>
      );
      default: return <p className="text-white font-semibold">{device.value}%</p>;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 bg-gray-700 rounded"></div>
                  <div className="h-4 w-16 bg-gray-700 rounded"></div>
                </div>
                <div className="h-4 w-12 bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={handleRefresh} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 cursor-pointer border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Device Analytics</h3>
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            {['percentage', 'sessions', ...(showDetailed ? ['detailed'] : [])].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  viewMode === mode ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode === 'percentage' ? '%' : mode === 'sessions' ? 'Sessions' : 'Details'}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  {[
                    { label: 'Export CSV', action: () => handleExport('csv'), icon: Download },
                    { label: 'Export PDF', action: () => handleExport('pdf'), icon: Download },
                    { label: 'Custom Range', action: () => onTimeRangeChange?.('custom'), icon: Calendar }
                  ].map((item, i) => (
                    <button
                      key={i}
                      onClick={item.action}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.id} className="group">
            <div 
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-all duration-200"
              onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <device.icon className={`h-5 w-5 ${device.color} group-hover:scale-110 transition-transform duration-200`} />
                  {device.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-400 absolute -top-1 -right-1" />}
                  {device.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-400 absolute -top-1 -right-1" />}
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{device.name}</span>
                <span className={`text-xs font-medium ${device.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {device.change >= 0 ? '+' : ''}{device.change}%
                </span>
              </div>
              
              <div className="text-right">{renderValue(device)}</div>
            </div>

            {/* Progress Bar */}
            <div className="ml-8 mt-2">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(device.color)}`}
                  style={{ width: `${device.value}%` }}
                />
              </div>
            </div>

            {/* Detailed View */}
            {selectedDevice === device.id && showDetailed && (
              <div className="ml-8 mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600 animate-fade-in">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Bounce Rate', value: `${device.bounceRate}%` },
                    { label: 'Avg. Duration', value: device.avgDuration },
                    { label: 'Conversion Rate', value: `${device.conversionRate}%` },
                    { label: 'Sessions', value: formatNumber(device.sessions) }
                  ].map((metric, i) => (
                    <div key={i}>
                      <p className="text-xs text-gray-400">{metric.label}</p>
                      <p className="text-white font-semibold">{metric.value}</p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-2">Top Models</p>
                  <div className="space-y-2">
                    {device.topModels.map((model, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{model.model}</span>
                        <span className="text-sm text-white">{model.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Total Sessions</span>
          <span className="text-white font-semibold">
            {formatNumber(devices.reduce((sum, device) => sum + device.sessions, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeviceAnalytics;