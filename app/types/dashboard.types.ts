export interface StatCard {
  id: string;
  title: string;
  value: string;
  previousValue: number;
  change: number;
  changeType: "increase" | "decrease";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  format: "number" | "currency" | "percentage" | "time";
  description: string;
  trend: number[];
}


 

 