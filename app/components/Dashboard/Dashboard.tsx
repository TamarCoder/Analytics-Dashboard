import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Target, Users } from "lucide-react";
import MetricCard from "../Cards/MetricCard/MetricCard";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      // მომხმარებლების რაოდენობა
      const usersRes = await fetch("https://dummyjson.com/users");
      const usersData = await usersRes.json();
      setTotalUsers(usersData.total);  

      // გაყიდვები და შეკვეთები
      const cartsRes = await fetch("https://dummyjson.com/carts");
      const cartsData = await cartsRes.json();

      const totalRevenue = cartsData.carts.reduce(
        (sum: number, cart: { total: number }) => {
          return sum + cart.total;
        },
        0
      );
      const totalOrders = cartsData.total;  

      setRevenue(totalRevenue);
      setOrders(totalOrders);

      
      const conversionRate = ((totalOrders / usersData.total) * 100).toFixed(2);
      setConversion(Number(conversionRate));

    } catch (err) {
      console.error("Error fetching metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000);  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-800">
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-400">
            Monitor your business performance and key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={loading ? "Loading..." : totalUsers.toLocaleString()}
            change={12.5}
            icon={Users}
            color="bg-blue-600"
          />
          <MetricCard
            title="Revenue"
            value={loading ? "Loading..." : `$${revenue.toLocaleString()}`}
            change={8.2}
            icon={DollarSign}
            color="bg-green-600"
          />
          <MetricCard
            title="Orders"
            value={loading ? "Loading..." : orders.toLocaleString()}
            change={-2.1}
            icon={ShoppingCart}
            color="bg-purple-600"
          />
          <MetricCard
            title="Conversion Rate"
            value={loading ? "Loading..." : `${conversion}%`}
            change={15.3}
            icon={Target}
            color="bg-yellow-600"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
