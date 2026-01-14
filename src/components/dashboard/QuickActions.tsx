import React from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const QuickActions: React.FC = () => {
  const handleAddIncome = () => {
    // TODO: Open add income modal
    console.log('Add income');
  };

  const handleAddExpense = () => {
    // TODO: Open add expense modal
    console.log('Add expense');
  };

  const handleExport = () => {
    // TODO: Export data to CSV
    console.log('Export data');
  };

  return (
    <Card className="h-48">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button variant="primary" className="w-full" onClick={handleAddIncome}>
          + Add Income
        </Button>
        <Button variant="secondary" className="w-full" onClick={handleAddExpense}>
          + Add Expense
        </Button>
        <Button variant="outline" className="w-full" onClick={handleExport}>
          Export Data
        </Button>
      </div>
    </Card>
  );
};
