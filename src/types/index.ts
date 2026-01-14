export interface Transaction {
  id?: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  description: string;
  amount: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface DashboardData {
  transactions: Transaction[];
  totalBalance: number;
  monthlyStats: MonthlyStats[];
  categoryBreakdown: CategoryBreakdown[];
  lastUpdated: Date;
}

export type Theme = 'light' | 'dark';
