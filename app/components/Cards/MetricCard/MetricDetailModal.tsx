import React from "react";
import {
  DollarSign,
  X,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Target,
  TrendingUp,
} from "lucide-react";
import { MetricData } from "./useMetricModal";
 

interface MetricDetailModalProps {
  data: MetricData;
  onClose: () => void;
}

const MetricDetailModal: React.FC<MetricDetailModalProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {data.title}
              </h2>
              <p className="text-gray-400 text-sm">
                {data.description}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">Current Value</span>
              </div>
              <div className="text-2xl font-bold text-white">{data.currentValue}</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-gray-400 text-sm">Change</span>
              </div>
              <div className={`text-2xl font-bold ${
                data.trend === "up" ? "text-green-400" : "text-red-400"
              }`}>
                {data.change}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-gray-400 text-sm">Time Frame</span>
              </div>
              <div className="text-lg font-semibold text-white">
                {data.timeFrame}
              </div>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <LineChart className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">
                Trend Analysis
              </h3>
            </div>
            <div className="h-48 flex items-end justify-center space-x-8 px-4">
              {data.chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="bg-blue-600 rounded-t w-12 hover:bg-blue-500 transition-colors cursor-pointer"
                    style={{ 
                      height: `${(item.value / Math.max(...data.chartData.map(d => d.value))) * 192}px` 
                    }}
                  ></div>
                  <div className="text-xs text-gray-400 mt-2">{item.month}</div>
                  <div className="text-xs text-white font-medium">
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <PieChart className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">
                Breakdown
              </h3>
            </div>

            <div className="space-y-3">
              {data.breakdown.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <span className="text-white font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-bold">{item.amount}</span>
                    <span className="text-gray-400 text-sm">({item.percentage})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-white">Key Insights</h3>
            </div>
            <div className="space-y-3">
              {data.insights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    index === 0 ? 'bg-yellow-400' :
                    index === 1 ? 'bg-green-400' :
                    index === 2 ? 'bg-blue-400' :
                    'bg-purple-400'
                  }`}></div>
                  <p className="text-gray-300">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
              <h4 className="text-white font-semibold mb-3">
                Performance Metrics
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">
                    Average Order Value
                  </span>
                  <span className="text-white font-medium">$36.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Customer LTV</span>
                  <span className="text-white font-medium">$450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Churn Rate</span>
                  <span className="text-green-400 font-medium">2.1%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
              <h4 className="text-white font-semibold mb-3">Goal Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">
                      Monthly Target
                    </span>
                    <span className="text-white text-sm">90%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">
                      Quarterly Goal
                    </span>
                    <span className="text-white text-sm">75%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 p-6 flex justify-between">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              View Report
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Set Alert
            </button>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricDetailModal;