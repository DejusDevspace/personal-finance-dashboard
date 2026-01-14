import type { Transaction, MonthlyStats, CategoryBreakdown } from '../types';

export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, transaction) => {
    return transaction.type === 'Income' ? sum + transaction.amount : sum - transaction.amount;
  }, 0);
};

export const getMonthlyIncome = (
  transactions: Transaction[],
  month: number,
  year: number
): number => {
  return transactions
    .filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === month && date.getFullYear() === year && t.type === 'Income';
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getMonthlyExpenses = (
  transactions: Transaction[],
  month: number,
  year: number
): number => {
  return transactions
    .filter((t) => {
      const date = new Date(t.date);
      return date.getMonth() === month && date.getFullYear() === year && t.type === 'Expense';
    })
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getMonthlyStats = (transactions: Transaction[]): MonthlyStats[] => {
  const stats: { [key: string]: MonthlyStats } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (!stats[key]) {
      stats[key] = { month, year, income: 0, expenses: 0, balance: 0 };
    }

    if (transaction.type === 'Income') {
      stats[key].income += transaction.amount;
    } else {
      stats[key].expenses += transaction.amount;
    }

    stats[key].balance = stats[key].income - stats[key].expenses;
  });

  return Object.values(stats).sort((a, b) => {
    const dateA = new Date(a.year, a.month);
    const dateB = new Date(b.year, b.month);
    return dateA.getTime() - dateB.getTime();
  });
};

export const getCategoryBreakdown = (transactions: Transaction[]): CategoryBreakdown[] => {
  const expenses = transactions.filter((t) => t.type === 'Expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

  const breakdown: { [key: string]: number } = {};
  expenses.forEach((transaction) => {
    breakdown[transaction.category] = (breakdown[transaction.category] || 0) + transaction.amount;
  });

  return Object.entries(breakdown)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const getTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
): Transaction[] => {
  return transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return transactionDate >= startDate && transactionDate <= endDate;
  });
};

export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};
