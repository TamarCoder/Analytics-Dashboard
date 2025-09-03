import { LucideIcon } from "lucide-react";

// Type definitions
export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | null;
}

export interface SubMenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface ExpandedSections {
  analytics: boolean;
  reports: boolean;
  filters: boolean;
}

export interface Filters {
  dateRange: string;
  category: string;
  status: string;
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle: () => void;
}