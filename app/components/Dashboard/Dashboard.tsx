import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Target, Users } from "lucide-react";
import MetricCard from "../Cards/MetricCard/MetricCard";
import MetricDetailModal from "../Cards/MetricCard/MetricDetailModal";
import { useMetricModal } from "../Cards/MetricCard/useMetricModal";
import { getMetricData } from "../Cards/MetricCard/getMetricData";
import ChartComponent from "../ChartComponent/ChartComponent";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, selectedMetric, openModal, closeModal } = useMetricModal();

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      // მომხმარებლების რაოდენობა
      const usersRes = await fetch("https://dummyjson.com/users");
      if (!usersRes.ok) throw new Error("Failed to fetch users");
      const usersData = await usersRes.json();
      setTotalUsers(usersData.total);

      // გაყიდვები და შეკვეთები
      const cartsRes = await fetch("https://dummyjson.com/carts");
      if (!cartsRes.ok) throw new Error("Failed to fetch carts");
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
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000); // 30 წამი, 10 წამი ზედმეტად ხშირია
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (metricType: string) => {
    const data = getMetricData(metricType);
    openModal(data);
  };

  const retryFetch = () => {
    fetchMetrics();
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-400">
            Monitor your business performance and key metrics
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-red-400 font-semibold">Connection Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
              <button
                onClick={retryFetch}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Static Revenue Card with Modal */}
          {/* Dynamic API Data Cards */}
          <MetricCard
            title="Total Users"
            value={loading ? "Loading..." : totalUsers.toLocaleString()}
            change="+8.2%"
            trend="up"
            icon={Users}
            color="bg-green-600"
            onClick={() => handleCardClick("users")}
          />

          <MetricCard
            title="Revenue"
            value={loading ? "Loading..." : `$${revenue.toLocaleString()}`}
            change="+8.2%"
            trend="up"
            icon={DollarSign}
            color="bg-purple-600"
            onClick={() => handleCardClick("revenue")}
          />

          <MetricCard
            title="Orders"
            value={loading ? "Loading..." : orders.toLocaleString()}
            change="-2.1%"
            trend="down"
            icon={ShoppingCart}
            color="bg-yellow-600"
            onClick={() => handleCardClick("orders")}
          />

          <MetricCard
            title="Conversion Rate"
            value={loading ? "Loading..." : `${conversion}%`}
            change="+15.3%"
            trend="up"
            icon={Target}
            color="bg-yellow-600"
            onClick={() => handleCardClick("conversion")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartComponent title="Revenue Trends" /> 
          <ChartComponent title="User Activity" />  
        </div>

        {/* Stats Summary */}
      </main>

      {/* Modal - Only show when open */}
      {isOpen && selectedMetric && (
        <MetricDetailModal data={selectedMetric} onClose={closeModal} />
      )}
    </div>
  );
};

export default Dashboard;
