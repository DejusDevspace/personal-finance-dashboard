import React from 'react';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

interface SummaryCardProps {
  income: number;
  expenses: number;
  isLoading?: boolean;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  income,
  expenses,
  isLoading = false,
}) => {
  return (
    <Card variant="glass" className="h-48">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">This Month Income</p>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(income)}</p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">This Month Expenses</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(expenses)}</p>
          </div>
        </div>
      )}
    </Card>
  );
};
