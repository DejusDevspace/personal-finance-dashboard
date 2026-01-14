export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const formatPercentage = (percentage: number, decimals: number = 1): string => {
  return `${percentage.toFixed(decimals)}%`;
};

export const formatCompactNumber = (num: number): string => {
  const absNum = Math.abs(num);
  if (absNum >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (absNum >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export const truncateString = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};
