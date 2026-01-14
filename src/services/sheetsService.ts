import type { Transaction, DashboardData } from '../types';
import { GOOGLE_SHEETS_CONFIG, API_BASE_URL } from '../config/googleSheets';
import {
  calculateTotalBalance,
  getMonthlyStats,
  getCategoryBreakdown,
} from '../utils/dataProcessing';

export const fetchGoogleSheetsData = async (): Promise<DashboardData> => {
  const { apiKey, spreadsheetId, range } = GOOGLE_SHEETS_CONFIG;

  if (!apiKey || !spreadsheetId) {
    throw new Error('Google Sheets API configuration is missing. Please set environment variables.');
  }

  try {
    const url = `${API_BASE_URL}/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const response = await fetch(url);
    // console.log('response', response);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.statusText}`);
    }

    const result = await response.json();
    const rows = result.values || [];

    if (rows.length === 0) {
      throw new Error('No data found in the spreadsheet');
    }

    // Parse the data from Google Sheets
    // Expected format: Date | Type | Category | Description | Amount
    const transactions = parseTransactions(rows.slice(1)); // Skip header row

    // Calculate dashboard data
    const totalBalance = calculateTotalBalance(transactions);
    const monthlyStats = getMonthlyStats(transactions);
    const categoryBreakdown = getCategoryBreakdown(transactions);

    return {
      transactions,
      totalBalance,
      monthlyStats,
      categoryBreakdown,
      lastUpdated: new Date(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch Google Sheets data: ${error.message}`);
    }
    throw new Error('Failed to fetch Google Sheets data: Unknown error');
  }
};

const parseDate = (dateString: string): Date => {
  // Handle DD/MM/YYYY format
  const ddMMyyyyRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.trim().match(ddMMyyyyRegex);

  if (match) {
    const [, day, month, year] = match;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  // Fallback to standard date parsing
  const standardDate = new Date(dateString);
  if (isNaN(standardDate.getTime())) {
    throw new Error(`invalid date`);
  }

  return standardDate;
};

const parseAmount = (amountString: string): number => {
  // Remove currency symbols, commas, and whitespace
  const cleanedAmount = String(amountString)
    .replace(/[₦$€£¥]/g, '') // Remove currency symbols
    .replace(/,/g, '') // Remove commas
    .trim();

  const parsedAmount = parseFloat(cleanedAmount);

  if (isNaN(parsedAmount)) {
    throw new Error(`invalid amount`);
  }

  return Math.abs(parsedAmount);
};

const parseTransactions = (rows: string[][]): Transaction[] => {
  return rows
    .filter((row) => row.length >= 5 && row[0] && row[1] && row[2] && row[3] && row[4])
    .map((row, index) => {
      const [dateStr, typeStr, category, description, amountStr] = row;

      try {
        // Parse and validate date
        const date = parseDate(dateStr);

        // Parse and validate type (case-insensitive)
        const normalizedType = typeStr.trim().toUpperCase();
        const parsedType = (normalizedType === 'INCOME' || normalizedType === 'Income')
          ? 'Income'
          : (normalizedType === 'EXPENSE' || normalizedType === 'Expense')
            ? 'Expense'
            : 'Expense';

        // Parse and validate amount
        const amount = parseAmount(amountStr);

        return {
          id: `transaction-${index}`,
          date: date.toISOString(),
          type: parsedType,
          category: String(category).trim(),
          description: String(description).trim(),
          amount,
        } as const as Transaction;
      } catch (err) {
        const errorDetail = err instanceof Error ? err.message : 'unknown error';
        console.warn(`Skipping row ${index}: ${errorDetail} (${dateStr}, ${typeStr}, ${amountStr})`);
        return null;
      }
    })
    .filter((transaction): transaction is Transaction => transaction !== null);
};
