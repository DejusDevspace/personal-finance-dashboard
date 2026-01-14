import { useState, useCallback, useEffect } from 'react';
import type { DashboardData } from '../types';
import { fetchGoogleSheetsData } from '../services/sheetsService';

export const useGoogleSheets = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dashboardData = await fetchGoogleSheetsData();
      console.log("Dashboard data:", dashboardData);
      setData(dashboardData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Error fetching Google Sheets data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, isLoading, error, refetch: fetchData };
};
