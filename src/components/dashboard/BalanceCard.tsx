import React from 'react';
import { Card } from '../common/Card';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

interface BalanceCardProps {
  balance: number;
  previousBalance?: number;
  isLoading?: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  previousBalance = 0,
  isLoading = false,
}) => {
  const percentageChange = previousBalance ? ((balance - previousBalance) / Math.abs(previousBalance)) * 100 : 0;
  const isPositive = balance >= 0;
  const isIncreased = percentageChange >= 0;

  return (
    <Card variant="glass" className="h-48 flex flex-col justify-between">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Balance</p>
          </div>
          <div>
            <h2 className={`text-4xl font-bold mb-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(balance)}
            </h2>
            {previousBalance !== undefined && previousBalance !== 0 && (
              <p className={`text-sm font-medium ${isIncreased ? 'text-green-600' : 'text-red-600'}`}>
                {isIncreased ? '+' : ''}{formatPercentage(percentageChange)} from last month
              </p>
            )}
          </div>
        </>
      )}
    </Card>
  );
};
