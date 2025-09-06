import React, { useState, useEffect } from 'react';
import { Globe, Target, Users, Eye, TrendingUp, Mail } from 'lucide-react';

interface TrafficSource {
  name: string;
  value: number;
  color: string;
  icon: React.ElementType;
  change: number;
}

const TrafficSources: React.FC = () => {
  const [sources, setSources] = useState<TrafficSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultSources: TrafficSource[] = [
    { name: 'Organic Search', value: 45.2, color: 'bg-blue-500', icon: Globe, change: 2.1 },
    { name: 'Direct', value: 28.8, color: 'bg-green-500', icon: Target, change: 1.5 },
    { name: 'Social Media', value: 15.6, color: 'bg-purple-500', icon: Users, change: -0.8 },
    { name: 'Referral', value: 10.4, color: 'bg-yellow-500', icon: Eye, change: 0.3 },
    { name: 'Email', value: 4.2, color: 'bg-red-500', icon: Mail, change: 1.2 },
    { name: 'Paid Ads', value: 2.8, color: 'bg-indigo-500', icon: TrendingUp, change: 0.7 }
  ];

  const generateDynamicData = async (): Promise<TrafficSource[]> => {
    try {
      // Simplified API calls
      const [usersRes, productsRes] = await Promise.all([
        fetch('https://dummyjson.com/users?limit=10').catch(() => ({ json: () => ({ total: 200 }) })),
        fetch('https://dummyjson.com/products?limit=10').catch(() => ({ json: () => ({ products: new Array(30) }) }))
      ]);
      
      const [users, products] = await Promise.all([
        usersRes.json(),
        productsRes.json()
      ]);

      const marketSentiment = (Math.random() - 0.5) * 4; // Random market sentiment
      const baseUsers = users.total || 200;
      const productCount = products.products?.length || 30;

      const dynamicSources: TrafficSource[] = [
        {
          name: 'Organic Search',
          value: 42 + marketSentiment * 2,
          color: 'bg-blue-500',
          icon: Globe,
          change: marketSentiment
        },
        {
          name: 'Direct',
          value: 28 + (baseUsers / 10),
          color: 'bg-green-500',
          icon: Target,
          change: (baseUsers - 180) / 10
        },
        {
          name: 'Social Media',
          value: 15 + (productCount / 5),
          color: 'bg-purple-500',
          icon: Users,
          change: (productCount - 25) / 2
        },
        {
          name: 'Referral',
          value: 8 + Math.random() * 4,
          color: 'bg-yellow-500',
          icon: Eye,
          change: (Math.random() - 0.5) * 3
        },
        {
          name: 'Email',
          value: 4 + Math.abs(marketSentiment) / 2,
          color: 'bg-red-500',
          icon: Mail,
          change: marketSentiment / 2
        },
        {
          name: 'Paid Ads',
          value: 3 + (marketSentiment > 0 ? marketSentiment : 0),
          color: 'bg-indigo-500',
          icon: TrendingUp,
          change: marketSentiment
        }
      ];

      // Normalize to 100%
      const total = dynamicSources.reduce((sum, source) => sum + source.value, 0);
      return dynamicSources.map(source => ({
        ...source,
        value: Number(((source.value / total) * 100).toFixed(1))
      }));
    } catch {
      return defaultSources;
    }
  };

  const fetchTrafficData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await generateDynamicData();
      setSources(data);
    } catch (err) {
      setError('Failed to fetch traffic data');
      setSources(defaultSources);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                <div className="w-20 h-4 bg-gray-700 rounded"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 h-2 bg-gray-700 rounded-full"></div>
                <div className="w-12 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Traffic Sources</h3>
        <div className="text-center text-red-400 py-8">
          <p>{error}</p>
          <button 
            onClick={fetchTrafficData}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const topSource = sources.reduce((max, source) => source.value > max.value ? source : max, sources[0]);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
        <div className="flex items-center text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
          Live Data
        </div>
      </div>
      
      {/* Sources List */}
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center justify-between group hover:bg-gray-800 p-2 rounded-lg transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${source.color} group-hover:scale-110 transition-transform duration-200`}>
                <source.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{source.name}</span>
                <div className="flex items-center text-xs">
                  <span className={`${source.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {source.change >= 0 ? '+' : ''}{source.change.toFixed(1)}%
                  </span>
                  <span className="text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${source.color} transition-all duration-1000`}
                  style={{ width: `${Math.min(source.value, 100)}%` }}
                />
              </div>
              <span className="text-white font-medium w-12 text-right">{source.value}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-400">Total Sources</div>
            <div className="text-white font-semibold">{sources.length}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Top Source</div>
            <div className="text-white font-semibold">{topSource?.name || 'N/A'}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Last Update</div>
            <div className="text-white font-semibold">
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSources;