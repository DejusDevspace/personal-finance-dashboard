import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./ChartContainer";
import { type MonthlyStats } from "../../types";
import { useTheme } from "../../hooks/useTheme";

interface IncomeExpenseChartProps {
	data: MonthlyStats[];
	isLoading?: boolean;
}

export const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({
	data,
	isLoading = false,
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	if (!data || data.length === 0) {
		return (
			<ChartContainer title="Income vs Expenses Over Time" isLoading={isLoading}>
				<div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
					<p>No data available</p>
				</div>
			</ChartContainer>
		);
	}

	// Format data for the chart
	const chartData = data.map((stat) => ({
		month: new Date(stat.year, stat.month).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric",
		}),
		income: stat.income,
		expenses: stat.expenses,
		balance: stat.balance,
	}));

	const gridColor = isDark ? "#374151" : "#e5e7eb";
	const textColor = isDark ? "#d1d5db" : "#374151";

	return (
		<ChartContainer title="Income vs Expenses Over Time" isLoading={isLoading}>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
					<XAxis
						dataKey="month"
						stroke={textColor}
						style={{ fontSize: "12px" }}
					/>
					<YAxis stroke={textColor} style={{ fontSize: "12px" }} />
					<Tooltip
						contentStyle={{
							backgroundColor: isDark ? "#1f2937" : "#ffffff",
							border: `1px solid ${gridColor}`,
							borderRadius: "8px",
							color: textColor,
						}}
						formatter={(value) => `₦${(value as number).toLocaleString()}`}
					/>
					<Legend wrapperStyle={{ paddingTop: "20px" }} />
					<Line
						type="monotone"
						dataKey="income"
						stroke="#10b981"
						strokeWidth={2}
						dot={{ fill: "#10b981", r: 4 }}
						activeDot={{ r: 6 }}
						name="Income"
					/>
					<Line
						type="monotone"
						dataKey="expenses"
						stroke="#ef4444"
						strokeWidth={2}
						dot={{ fill: "#ef4444", r: 4 }}
						activeDot={{ r: 6 }}
						name="Expenses"
					/>
				</LineChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};
