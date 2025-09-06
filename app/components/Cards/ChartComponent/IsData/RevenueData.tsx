import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ტიპების განსაზღვრა
interface RevenueData {
  month: string;   // თვე
  revenue: number; // შემოსავალი
  profit: number;  // მოგება
  growth: number;  // ზრდა პროცენტებში
}

interface StockData {
  c: number;  // მიმდინარე ფასი
  d: number;  // ცვლილება
  dp: number; // ცვლილება პროცენტებში
  h: number;  // დღის მაქსიმუმი
  l: number;  // დღის მინიმუმი
  o: number;  // გახსნის ფასი
  pc: number; // წინა დღის დახურვის ფასი
}

const RevenueChart = () => {
  // სტეიტების განსაზღვრა
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ისტორიული შემოსავლების მონაცემების გენერაცია რეალური API-ს საფუძველზე
  const generateHistoricalData = (stockData: StockData[]): RevenueData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    
    return months.map((month, index) => {
      // აქციების მონაცემების გამოყენება რეალისტური შემოსავლების ვარიაციებისთვის
      const baseRevenue = 50000; // ბაზისური შემოსავალი
      const stockInfluence = stockData[index % stockData.length];
      const variation = stockInfluence ? (stockInfluence.dp / 100) * baseRevenue : 0;
      
      return {
        month,
        revenue: Math.round(baseRevenue + variation + (Math.random() - 0.5) * 10000),
        profit: Math.round((baseRevenue + variation) * 0.2 + (Math.random() - 0.5) * 5000),
        growth: parseFloat((Math.random() * 20 - 10).toFixed(2))  
      };
    });
  };

  // შემოსავლების მონაცემების წამოღება მრავალი წყაროდან
  const fetchRevenueData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // ვარიანტი 1: აქციების მონაცემების გამოყენება შემოსავლის გავლენისთვის 
      const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA'];
      const API_KEY = 'demo'; // Replace with your Finnhub API key
      
      const stockPromises = symbols.map(async (symbol) => {
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
          );
          if (!response.ok) throw new Error('API limit reached');
          return await response.json();
        } catch {
          // დემო მონაცემებზე გადართვა API-ის წარუმატებლობის შემთხვევაში
          return {
            c: Math.random() * 200 + 100,
            d: (Math.random() - 0.5) * 10,
            dp: (Math.random() - 0.5) * 5,
            h: Math.random() * 220 + 100,
            l: Math.random() * 180 + 80,
            o: Math.random() * 200 + 100,
            pc: Math.random() * 200 + 100
          };
        }
      });

      const stockData = await Promise.all(stockPromises);
      
      // ალტერნატივა: DummyJSON-ის გამოყენება ელექტრონული კომერციის მონაცემებისთვის
      const cartsResponse = await fetch('https://dummyjson.com/carts');
      const cartsData = await cartsResponse.json();
      
      // ისტორიული შემოსავლების მონაცემების გენერაცია
      const revenueData = generateHistoricalData(stockData);
      
      // ნამდვილი კალათის მონაცემებით გაუმჯობესება
      if (cartsData.carts) {
        const totalSales = cartsData.carts.reduce((sum: number, cart: any) => sum + cart.total, 0);
        
        // ნამდვილი გაყიდვების გავლენის გამოყენება მიმდინარე თვეზე
        revenueData[revenueData.length - 1].revenue = Math.round(totalSales * 100);
        revenueData[revenueData.length - 1].profit = Math.round(totalSales * 20);
      }
      
      setData(revenueData);
      
    } catch (err) {
      console.error('Error fetching revenue data:', err);
      setError('Failed to fetch revenue data');
      
      // სარეზერვო ნიმუშ მონაცემებზე გადართვა
      setData([
        { month: 'Jan', revenue: 45000, profit: 8000, growth: 5.2 },
        { month: 'Feb', revenue: 52000, profit: 12000, growth: 8.1 },
        { month: 'Mar', revenue: 48000, profit: 6000, growth: -2.3 },
        { month: 'Apr', revenue: 61000, profit: 15000, growth: 12.4 },
        { month: 'May', revenue: 55000, profit: 9000, growth: -3.1 },
        { month: 'Jun', revenue: 67000, profit: 18000, growth: 15.7 },
        { month: 'Jul', revenue: 72000, profit: 22000, growth: 18.2 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData();
    const interval = setInterval(fetchRevenueData, 10000);
    return () => clearInterval(interval);
  }, []);

  // დადებითი/უარყოფითი მნიშვნელობებისთვის გრადიენტის ოფსეტის გამოთვლა
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.growth));
    const dataMin = Math.min(...data.map((i) => i.growth));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  // მორგებული ინფორმაციული ბარათი
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-3 border border-gray-600 rounded-lg shadow-lg">
          <p className="font-semibold text-white mb-2">{label}</p>
          <p className="text-green-400">
            Revenue: ${data.revenue.toLocaleString()}
          </p>
          <p className="text-blue-400">
            Profit: ${data.profit.toLocaleString()}
          </p>
          <p className={`${data.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            Growth: {data.growth}%
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
        <div className="text-gray-400">Loading revenue data...</div>
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
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
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
        {/* Y ღერძი - მნიშვნელობები */}
        <YAxis 
          tick={{ fontSize: 12, fill: '#9CA3AF' }}
          axisLine={{ stroke: '#4B5563' }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
        />
        {/* ინფორმაციული ბარათი */}
        <Tooltip content={<CustomTooltip />} />
        {/* ფერების გრადიენტის განსაზღვრა */}
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="#10B981" stopOpacity={0.8} />
            <stop offset={off} stopColor="#EF4444" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        {/* ძირითადი ფართობის დიაგრამა */}
        <Area 
          type="monotone" 
          dataKey="growth" 
          stroke="#6B7280" 
          fill="url(#splitColor)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;