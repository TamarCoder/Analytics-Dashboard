import { MetricData } from './useMetricModal';

export const getMetricData = (metricType: string): MetricData => {
  const mockData = {
    revenue: {
      title: "Revenue Analytics",
      currentValue: "$45,231",
      change: "+20.1%",
      trend: "up" as const,
      timeFrame: "vs last month",
      description: "Total revenue generated across all channels",
      chartData: [
        { month: "Jan", value: 35000 },
        { month: "Feb", value: 38000 },
        { month: "Mar", value: 42000 },
        { month: "Apr", value: 45231 },
      ],
      insights: [
        "Revenue increased by 20.1% compared to last month",
        "Strongest growth in subscription services (+35%)",
        "Mobile sales contributed 45% of total revenue",
        "Customer retention rate improved to 89%"
      ],
      breakdown: [
        { category: "Subscriptions", amount: "$18,092", percentage: "40%" },
        { category: "One-time Sales", amount: "$13,569", percentage: "30%" },
        { category: "Mobile App", amount: "$9,046", percentage: "20%" },
        { category: "Partnerships", amount: "$4,524", percentage: "10%" }
      ]
    },
    users: {
      title: "User Analytics",
      currentValue: "2,350",
      change: "+180",
      trend: "up" as const,
      timeFrame: "this month",
      description: "Active users across all platforms",
      chartData: [
        { month: "Jan", value: 1950 },
        { month: "Feb", value: 2100 },
        { month: "Mar", value: 2170 },
        { month: "Apr", value: 2350 },
      ],
      insights: [
        "New user registrations up 12% this month",
        "Daily active users increased by 8%",
        "User engagement time improved by 15 minutes",
        "Mobile users now represent 65% of total"
      ],
      breakdown: [
        { category: "Daily Active", amount: "1,890", percentage: "80%" },
        { category: "Weekly Active", amount: "2,115", percentage: "90%" },
        { category: "Mobile Users", amount: "1,528", percentage: "65%" },
        { category: "Desktop Users", amount: "822", percentage: "35%" }
      ]
    },
    orders: {
      title: "Orders Analytics",
      currentValue: "1,234",
      change: "+12%",
      trend: "up" as const,
      timeFrame: "vs last month",
      description: "Total orders processed this month",
      chartData: [
        { month: "Jan", value: 980 },
        { month: "Feb", value: 1050 },
        { month: "Mar", value: 1100 },
        { month: "Apr", value: 1234 },
      ],
      insights: [
        "Order volume increased by 12% month-over-month",
        "Average order value grew to $36.50",
        "Peak ordering time: 2-4 PM weekdays",
        "Return rate decreased to 3.2%"
      ],
      breakdown: [
        { category: "Completed", amount: "1,111", percentage: "90%" },
        { category: "Pending", amount: "86", percentage: "7%" },
        { category: "Cancelled", amount: "25", percentage: "2%" },
        { category: "Refunded", amount: "12", percentage: "1%" }
      ]
    },
    conversion: {
      title: "Conversion Analytics",
      currentValue: "3.24%",
      change: "+0.5%",
      trend: "up" as const,
      timeFrame: "vs last month",
      description: "Conversion rate across all funnels",
      chartData: [
        { month: "Jan", value: 2.8 },
        { month: "Feb", value: 2.9 },
        { month: "Mar", value: 3.1 },
        { month: "Apr", value: 3.24 },
      ],
      insights: [
        "Conversion rate improved by 0.5 percentage points",
        "Mobile conversion rate: 2.8% (+0.3%)",
        "Desktop conversion rate: 4.1% (+0.8%)",
        "Checkout abandonment reduced to 12%"
      ],
      breakdown: [
        { category: "Landing Page", amount: "8.2%", percentage: "100%" },
        { category: "Product View", amount: "15.4%", percentage: "100%" },
        { category: "Add to Cart", amount: "22.1%", percentage: "100%" },
        { category: "Checkout", amount: "3.24%", percentage: "100%" }
      ]
    }
  };

  return mockData[metricType as keyof typeof mockData] || mockData.revenue;
};