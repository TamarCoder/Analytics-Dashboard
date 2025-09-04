import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Activity,
  Settings,
} from "lucide-react";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}
const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", active: true },
    { icon: TrendingUp, label: "Analytics" },
    { icon: Users, label: "Users" },
    { icon: DollarSign, label: "Revenue" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Target, label: "Goals" },
    { icon: Activity, label: "Reports" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="bg-gray-900 border-r border-gray-700 w-64 min-h-screen p-6 hidden lg:block">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <a
            href="#"
            key={index}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              item.active
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <item.icon
              className={`h-5 w-5 ${
                item.active ? "text-white" : "group-hover:text-blue-400"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;
