import { useState } from "react";
import type { Transaction } from "./types";
import { Layout } from "./components/layout/Layout";
import { BalanceCard } from "./components/dashboard/BalanceCard";
import { SummaryCard } from "./components/dashboard/SummaryCard";
import { QuickActions } from "./components/dashboard/QuickActions";
import { IncomeExpenseChart } from "./components/charts/IncomeExpenseChart";
import { ExpenseBreakdownChart } from "./components/charts/ExpenseBreakdownChart";
import { TransactionList } from "./components/transactions/TransactionList";
import { TransactionFilter } from "./components/transactions/TransactionFilter";
import { LoadingSpinner } from "./components/common/LoadingSpinner";
import { useGoogleSheets } from "./hooks/useGoogleSheets";
import { getMonthlyIncome, getMonthlyExpenses } from "./utils/dataProcessing";

interface FilterOptions {
	startDate?: string;
	endDate?: string;
	type?: string;
	category?: string;
}

function App() {
	const { data, isLoading, error, refetch } = useGoogleSheets();
	const [filteredTransactions, setFilteredTransactions] = useState<
		Transaction[]
	>([]);

	if (isLoading) {
		return (
			<Layout>
				<div className="flex items-center justify-center h-screen">
					<LoadingSpinner />
				</div>
			</Layout>
		);
	}

	if (error) {
		return (
			<Layout>
				<div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
					<h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
						Error Loading Data
					</h2>
					<p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
					<button
						onClick={refetch}
						className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
					>
						Try Again
					</button>
				</div>
			</Layout>
		);
	}

	if (!data) {
		return (
			<Layout>
				<div className="text-center text-gray-500 dark:text-gray-400">
					No data available
				</div>
			</Layout>
		);
	}

	const currentMonth = new Date().getMonth();
	const currentYear = new Date().getFullYear();
	const monthlyIncome = getMonthlyIncome(
		data.transactions,
		currentMonth,
		currentYear
	);
	const monthlyExpenses = getMonthlyExpenses(
		data.transactions,
		currentMonth,
		currentYear
	);

	const displayTransactions =
		filteredTransactions.length > 0 ? filteredTransactions : data.transactions;

	const handleFilterChange = (filters: FilterOptions) => {
		let filtered = data.transactions;

		if (filters.startDate) {
			const startDate = new Date(filters.startDate);
			filtered = filtered.filter((t) => new Date(t.date) >= startDate);
		}

		if (filters.endDate) {
			const endDate = new Date(filters.endDate);
			filtered = filtered.filter((t) => new Date(t.date) <= endDate);
		}

		if (filters.type && filters.type !== "All") {
			filtered = filtered.filter((t) => t.type === filters.type);
		}

		if (filters.category && filters.category !== "All") {
			filtered = filtered.filter((t) => t.category === filters.category);
		}

		setFilteredTransactions(filtered);
	};

	return (
		<Layout>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<BalanceCard
					balance={data.totalBalance}
					previousBalance={data.totalBalance - monthlyIncome + monthlyExpenses}
				/>
				<SummaryCard income={monthlyIncome} expenses={monthlyExpenses} />
				<QuickActions />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div className="lg:col-span-2">
					<IncomeExpenseChart data={data.monthlyStats} />
				</div>
				<div>
					<ExpenseBreakdownChart data={data.categoryBreakdown} />
				</div>
			</div>

			<div className="mb-8">
				<TransactionFilter onFilterChange={handleFilterChange} />
			</div>

			<TransactionList transactions={displayTransactions} />
		</Layout>
	);
}

export default App;
