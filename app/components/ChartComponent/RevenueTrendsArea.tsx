import React from "react";
import { Filter, Download, RefreshCw, BarChart3 } from "lucide-react";
import RevenueChart from "./IsData/RevenueData";

interface ChartProps {
  title: string;
  children?: React.ReactNode;
}

const RevenueTrendsArea: React.FC<ChartProps> = ({ title, children }) => {
  return (
    <div className="w-full h-full ">
      <div className="w-full h-64">
          <RevenueChart/>
      </div>
    </div>
  );
};

export default RevenueTrendsArea;
