import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

// ტიპების განსაზღვრა
interface UserData {
  month: string;
  activeUsers: number;
  newUsers: number;
  premiumUsers: number;
}

interface APIUserData {
  total: number;
  users: Array<{
    id: number;
    firstName: string;
    lastName: string;
    age: number;
  }>;
}

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

export default function UsersActivityChart() {
  // სტეიტების განსაზღვრა
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ისტორიული იუზერების მონაცემების გენერაცია API-ს საფუძველზე
  const generateUserData = (totalUsers: number): UserData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    
    return months.map((month, index) => {
      // ბაზისური აქტიური იუზერების რაოდენობა
      const baseActive = Math.round(totalUsers * (0.6 + Math.random() * 0.3));
      // ახალი იუზერები - აქტიურების 20-40%
      const newUsers = Math.round(baseActive * (0.2 + Math.random() * 0.2));
      // პრემიუმ იუზერები - აქტიურების 10-20%
      const premiumUsers = Math.round(baseActive * (0.1 + Math.random() * 0.1));
      
      return {
        month,
        activeUsers: baseActive + (index * 200) + Math.round(Math.random() * 1000),
        newUsers: newUsers + Math.round(Math.random() * 500),
        premiumUsers: premiumUsers + Math.round(Math.random() * 200)
      };
    });
  };

  // იუზერების მონაცემების წამოღება API-დან
  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);

    try {
      // ძირითადი იუზერების მონაცემები DummyJSON-დან
      const usersResponse = await fetch('https://dummyjson.com/users');
      if (!usersResponse.ok) throw new Error('Failed to fetch users');
      
      const usersData: APIUserData = await usersResponse.json();
      
      // კალათების მონაცემები დამატებითი მეტრიკებისთვის
      const cartsResponse = await fetch('https://dummyjson.com/carts');
      if (!cartsResponse.ok) throw new Error('Failed to fetch carts');
      
      const cartsData = await cartsResponse.json();
      
      // რეალური მონაცემების საფუძველზე ისტორიული data-ს გენერაცია
      const generatedData = generateUserData(usersData.total);
      
      // მიმდინარე თვეზე რეალური მონაცემების გავლენა
      if (generatedData.length > 0 && cartsData.carts) {
        const lastMonth = generatedData[generatedData.length - 1];
        const activeCartsUsers = cartsData.carts.length;
        
        // რეალური აქტიური იუზერების რაოდენობის გამოყენება
        lastMonth.activeUsers = usersData.total;
        lastMonth.newUsers = Math.round(usersData.total * 0.15); // 15% ახალი
        lastMonth.premiumUsers = Math.round(activeCartsUsers * 2.5); // cart-ების საფუძველზე
      }
      
      setUserData(generatedData);
      
    } catch (err) {
      console.error('Error fetching users data:', err);
      setError('Failed to fetch users data');
      
      // სარეზერვო მონაცემები
      setUserData([
        { month: 'Jan', activeUsers: 4200, newUsers: 1800, premiumUsers: 650 },
        { month: 'Feb', activeUsers: 3800, newUsers: 2100, premiumUsers: 720 },
        { month: 'Mar', activeUsers: 5200, newUsers: 2800, premiumUsers: 890 },
        { month: 'Apr', activeUsers: 4600, newUsers: 2200, premiumUsers: 780 },
        { month: 'May', activeUsers: 6100, newUsers: 3200, premiumUsers: 1150 },
        { month: 'Jun', activeUsers: 5800, newUsers: 2900, premiumUsers: 1080 },
        { month: 'Jul', activeUsers: 6800, newUsers: 3500, premiumUsers: 1320 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
    
    // განახლება ყოველ 10 წუთში
    const interval = setInterval(fetchUsersData, 10000);
    return () => clearInterval(interval);
  }, []);

  // მორგებული Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-white mb-2">{label}</p>
          <p className="text-blue-400">
            Active Users: {data.activeUsers.toLocaleString()}
          </p>
          <p className="text-green-400">
            New Users: {data.newUsers.toLocaleString()}
          </p>
          <p className="text-purple-400">
            Premium Users: {data.premiumUsers.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // ჩატვირთვის მდგომარეობა
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">Loading users data...</div>
      </div>
    );
  }

  // შეცდომის მდგომარეობა
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

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
        {/* ბადე */}
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        {/* X ღერძი - თვეები */}
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={{ stroke: '#4B5563' }}
        />
        {/* Y ღერძი - იუზერების რაოდენობა */}
        <YAxis 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={{ stroke: '#4B5563' }}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
        />
        {/* ინფორმაციული ბარათი */}
        <Tooltip content={<CustomTooltip />} />
        {/* ძირითადი Bar დიაგრამა */}
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