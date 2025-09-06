import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

const userData = [
  {
    month: 'Jan',
    activeUsers: 4200,
    newUsers: 1800,
    premiumUsers: 650,
  },
  {
    month: 'Feb',
    activeUsers: 3800,
    newUsers: 2100,
    premiumUsers: 720,
  },
  {
    month: 'Mar',
    activeUsers: 5200,
    newUsers: 2800,
    premiumUsers: 890,
  },
  {
    month: 'Apr',
    activeUsers: 4600,
    newUsers: 2200,
    premiumUsers: 780,
  },
  {
    month: 'May',
    activeUsers: 6100,
    newUsers: 3200,
    premiumUsers: 1150,
  },
  {
    month: 'Jun',
    activeUsers: 5800,
    newUsers: 2900,
    premiumUsers: 1080,
  },
  {
    month: 'Jul',
    activeUsers: 6800,
    newUsers: 3500,
    premiumUsers: 1320,
  },
];

// TypeScript types
const getPath = (x: number, y: number, width: number, height: number): string => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

interface TriangleBarProps {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const TriangleBar = (props: TriangleBarProps) => {
  const { fill, x = 0, y = 0, width = 0, height = 0 } = props;
  
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg shadow-lg">
        <p className="font-semibold text-white mb-2">{label}</p>
        <p className="text-blue-400">
          {`Active Users: ${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function UsersActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={userData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={{ stroke: '#4B5563' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={{ stroke: '#4B5563' }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="activeUsers" 
          fill="#3B82F6" 
          shape={<TriangleBar />}
          radius={[4, 4, 0, 0]}
        >
          {userData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}