import React from 'react';
import { 
  Filter, 
  Download, 
  RefreshCw, 
  BarChart3 
} from 'lucide-react';
import RevenueTrendsArea from './RevenueTrendsArea';
import UsersChart from './UsersChart';

interface ChartProps {
  title: string;
  children?: React.ReactNode;
}

const ChartComponent: React.FC<ChartProps> = ({ title, children }) => {
  
  // ფუნქცია რომელიც title-ის მიხედვით განსაზღვრავს რომელი დიაგრამა უნდა გამოჩნდეს
  const renderChart = () => {
    if (children) {
      return children; // თუ children არის გადაცემული, მაშინ მას ვაჩვენებთ
    }

    switch (title) {
      case 'Revenue Trends':
        return <RevenueTrendsArea title='' />;
      case 'User Activity':
        return <UsersChart title='' />;
      default:
        return (
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Chart will be rendered here</p>
          </div>
        );
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200">
            <RefreshCw className="h-4 w-4" onClick={refreshPage} />
          </button>
        </div>
      </div>
      <div className="h-64 bg-gray-800  cursor-pointer rounded-lg flex items-center justify-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartComponent;