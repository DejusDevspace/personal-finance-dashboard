import React, { useState } from 'react';
import { Card } from '../common/Card';

interface TransactionFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  type?: 'Income' | 'Expense' | 'All';
  category?: string;
  startDate?: string;
  endDate?: string;
  searchText?: string;
}

export const TransactionFilter: React.FC<TransactionFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'All',
    searchText: '',
  });

  const handleChange = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <Card className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.searchText || ''}
          onChange={(e) => handleChange({ searchText: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <select
           value={filters.type || 'All'}
           onChange={(e) => handleChange({ type: e.target.value as 'Income' | 'Expense' | 'All' })}
           className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
         >
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="date"
          value={filters.startDate || ''}
          onChange={(e) => handleChange({ startDate: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="date"
          value={filters.endDate || ''}
          onChange={(e) => handleChange({ endDate: e.target.value })}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
    </Card>
  );
};
