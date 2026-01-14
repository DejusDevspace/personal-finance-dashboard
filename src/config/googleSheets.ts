// Google Sheets API Configuration
// Set these in your .env file

export const GOOGLE_SHEETS_CONFIG = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || '',
  range: import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Sheet1!A:F',
};

// OAuth Configuration (optional, for write access)
export const GOOGLE_OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET || '',
  redirectUri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URI || 'http://localhost:5173/callback',
};

export const API_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
