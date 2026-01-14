# Personal Finance Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and financial health with beautiful visualizations.

## Features

- 📊 **Interactive Charts**: Visualize income vs expenses over time and category breakdowns
- 💰 **Balance Tracking**: Monitor your total balance with percentage changes
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🌓 **Dark/Light Theme**: Toggle between themes with persistent storage
- 📈 **Data Analytics**: Comprehensive expense categorization and monthly statistics
- 🔄 **Real-time Data**: Integration with Google Sheets API for live data
- ⚡ **Fast Performance**: Built with Vite and optimized React components

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Sidebar, Layout wrapper
│   ├── dashboard/       # Balance cards, summaries, quick actions
│   ├── charts/          # Income/expense charts, breakdowns
│   ├── transactions/    # Transaction list, filters, items
│   └── common/          # Reusable Button, Card, Spinner
├── contexts/            # React Context for theme and data
├── hooks/               # Custom hooks (useTheme, useGoogleSheets)
├── utils/               # Helpers for data processing, formatting
├── types/               # TypeScript interfaces
└── config/              # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn/pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd personal-finance-dashboard-v2
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Configure your Google Sheets API credentials in `.env`

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Configuration

### Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API
4. Create OAuth 2.0 credentials (or API key for read-only access)
5. Copy your credentials to `.env`:
   - `VITE_GOOGLE_SHEETS_API_KEY`: Your API key
   - `VITE_GOOGLE_SHEETS_SPREADSHEET_ID`: Your spreadsheet ID
   - `VITE_GOOGLE_SHEETS_RANGE`: The sheet range (default: Sheet1!A:F)

### Expected Sheet Format

Your Google Sheet should have the following columns:

- **Date**: Transaction date (YYYY-MM-DD)
- **Type**: "Income" or "Expense"
- **Category**: Transaction category
- **Description**: Transaction description
- **Amount**: Transaction amount (numbers only)

## Technologies

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Lightning-fast build tool
- **Google Sheets API**: Data source integration

## Customization

### Adding a New Chart

1. Create a new component in `src/components/charts/`
2. Wrap it with `ChartContainer` component
3. Import and use in your dashboard layout

### Theme Customization

Edit the Tailwind configuration in `tailwind.config.js` to customize colors, fonts, and spacing.

### Data Processing

Extend the utilities in `src/utils/dataProcessing.ts` to add custom calculations or data transformations.
