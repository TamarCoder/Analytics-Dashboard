import React from 'react';
import {
   Filter,
   Download,
   RefreshCw,
   BarChart3
} from 'lucide-react';
import UsersActivityChart from './IsData/UsersData';

interface ChartProps {
  title: string;
  children?: React.ReactNode;
}

const UsersChart: React.FC<ChartProps> = ({ title, children }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-64">
        <UsersActivityChart/>
      </div>
    </div>
  );
};

export default UsersChart;