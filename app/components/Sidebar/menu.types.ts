import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Target,
  Activity,
  Settings,
  PieChart,
  LineChart,
  BarChart,
  UserPlus,
  UserCheck,
  Shield,
  CreditCard,
  TrendingDown,
  Package,
  Calendar,
  FileText,
  Wrench,
  Bell,
} from "lucide-react";
import { MenuItem } from "../types/dashboard.types";

export const menuItems: MenuItem[] = [
  { icon: BarChart3, label: "Dashboard", path: "/" },
  {
    icon: TrendingUp,
    label: "Analytics",
    path: "/analytics",
    submenu: [
      { label: "Overview", path: "/analytics/overview", icon: PieChart },
      { label: "Traffic", path: "/analytics/traffic", icon: LineChart },
      {
        label: "Performance",
        path: "/analytics/performance",
        icon: BarChart,
      },
      {
        label: "Conversion",
        path: "/analytics/conversion",
        icon: TrendingUp,
      },
    ],
  },
  {
    icon: Users,
    label: "Users",
    path: "/users",

    submenu: [
      { label: "All Users", path: "/users/all", icon: Users },
      { label: "Add User", path: "/users/add", icon: UserPlus },
      { label: "Active Users", path: "/users/active", icon: UserCheck },
      { label: "Permissions", path: "/users/permissions", icon: Shield },
    ],
  },
  {
    icon: DollarSign,
    label: "Revenue",
    path: "/revenue",
    submenu: [
      { label: "Overview", path: "/revenue/overview", icon: DollarSign },
      { label: "Payments", path: "/revenue/payments", icon: CreditCard },
      { label: "Refunds", path: "/revenue/refunds", icon: TrendingDown },
      {
        label: "Forecasting",
        path: "/revenue/forecasting",
        icon: TrendingUp,
      },
    ],
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    path: "/orders",
    submenu: [
      { label: "All Orders", path: "/orders/all", icon: ShoppingCart },
      { label: "Pending", path: "/orders/pending", icon: Package },
      { label: "Completed", path: "/orders/completed", icon: UserCheck },
      { label: "Cancelled", path: "/orders/cancelled", icon: TrendingDown },
    ],
  },
  {
    icon: Target,
    label: "Goals",
    path: "/goals",
    submenu: [
      { label: "Set Goals", path: "/goals/set", icon: Target },
      { label: "Track Progress", path: "/goals/track", icon: TrendingUp },
      { label: "Achievements", path: "/goals/achievements", icon: UserCheck },
      { label: "Calendar", path: "/goals/calendar", icon: Calendar },
    ],
  },
  {
    icon: Activity,
    label: "Reports",
    path: "/reports",
    submenu: [
      { label: "Generate Report", path: "/reports/generate", icon: FileText },
      { label: "Scheduled", path: "/reports/scheduled", icon: Calendar },
      { label: "Templates", path: "/reports/templates", icon: Activity },
      { label: "History", path: "/reports/history", icon: BarChart },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
    submenu: [
      { label: "General", path: "/settings/general", icon: Wrench },
      { label: "Notifications", path: "/settings/notifications", icon: Bell },
      { label: "Security", path: "/settings/security", icon: Shield },
      { label: "Integrations", path: "/settings/integrations", icon: Package },
    ],
  },
];
