import { useState } from 'react';

export interface MetricData {
  title: string;
  description: string;           
  currentValue: string;         
  change: string;
  trend: "up" | "down";          
  timeFrame: string;            
  chartData: Array<{           
    month: string;  
    value: number;
  }>;
  insights: string[];         
  breakdown: Array<{            
    category: string;
    amount: string;
    percentage: string;
  }>;
}

export const useMetricModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);

  const openModal = (metric: MetricData) => {
    setSelectedMetric(metric);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedMetric(null);
  };

  return {
    isOpen,
    selectedMetric,
    openModal,
    closeModal,
  };
};