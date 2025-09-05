import React from "react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 group">

      <div className="flex items-center justify-between cursor-pointer">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={`text-sm font-medium ${
                change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </div>
        <div
          className={`p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${color}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>

    </div>
  );
};

export default MetricCard;
