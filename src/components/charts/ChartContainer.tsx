import React from 'react';
import { Card } from '../common/Card';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  isLoading = false,
}) => {
  return (
    <Card className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </Card>
  );
};
