import React from 'react';
import { 
  Filter, 
  Download, 
  RefreshCw, 
  BarChart3 
} from 'lucide-react';

interface ChartProps {
  title: string;
  children?: React.ReactNode;
}

const Chart: React.FC<ChartProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Filter className="h-4 w-4 cursor-pointer" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Download className="h-4 w-4 cursor-pointer" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <RefreshCw className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
        {children || (
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4 cursor-pointer" />
            <p className="text-gray-400">Chart will be rendered here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;