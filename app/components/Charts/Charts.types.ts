
export interface ChartDataPoint {
  name: string;
  revenue?: number;
  users?: number;
  orders?: number;
  visitors?: number;
  [key: string]: string | number | undefined;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}