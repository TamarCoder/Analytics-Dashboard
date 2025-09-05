import { ReactNode } from 'react';

// Common Types
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Metric Card Types
export interface MetricData {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

export interface MetricCardProps extends BaseProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
  onClick?: () => void;
  loading?: boolean;
}

// Chart Types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

export interface ChartProps extends BaseProps {
  title: string;
  data?: ChartData;
  type?: 'line' | 'bar' | 'pie' | 'area';
  loading?: boolean;
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  onRefresh?: () => void;
}

// Traffic Source Types
export interface TrafficSource {
  name: string;
  value: number;
  color: string;
  icon: React.ElementType;
  change?: number;
}

// Device Analytics Types
export interface DeviceData {
  name: string;
  value: number;
  icon: React.ElementType;
  color: string;
  change?: number;
}

// Quick Actions Types
export interface ActionItem {
  label: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

// Navigation Types
export interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
  badge?: number;
  submenu?: MenuItem[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  permissions: string[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Dashboard State Types
export interface DashboardState {
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  metrics: MetricData[];
  chartData: ChartData[];
  trafficSources: TrafficSource[];
  deviceData: DeviceData[];
}


 export interface SubMenuItem {
  label: string;
  path: string;
  icon?: React.ElementType;
}