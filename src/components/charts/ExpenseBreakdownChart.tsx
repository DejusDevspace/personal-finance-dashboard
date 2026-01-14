import React from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";
import { ChartContainer } from "./ChartContainer";
import { type CategoryBreakdown } from "../../types";
import { useTheme } from "../../hooks/useTheme";

interface ExpenseBreakdownChartProps {
	data: CategoryBreakdown[];
	isLoading?: boolean;
}

const COLORS = [
	"#3b82f6",
	"#ef4444",
	"#10b981",
	"#f59e0b",
	"#8b5cf6",
	"#ec4899",
	"#14b8a6",
	"#f97316",
	"#06b6d4",
	"#84cc16",
	"#6366f1",
	"#d946ef",
];

export const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({
	data,
	isLoading = false,
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	if (!data || data.length === 0) {
		return (
			<ChartContainer title="Expense Breakdown" isLoading={isLoading}>
				<div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
					<p>No expense data available</p>
				</div>
			</ChartContainer>
		);
	}

	const chartData = data.map((item) => ({
		name: item.category,
		value: item.amount,
		percentage: item.percentage,
	}));

	return (
		<ChartContainer title="Expense Breakdown" isLoading={isLoading}>
			<ResponsiveContainer width="100%" height={300}>
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={({ name, value }) => {
							const total = chartData.reduce((sum, item) => sum + item.value, 0);
							const percentage = ((value as number / total) * 100).toFixed(1);
							return `${name}: ${percentage}%`;
						}}
						outerRadius={80}
						innerRadius={40}
						fill="#8884d8"
						dataKey="value"
					>
						{chartData.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: isDark ? "#1f2937" : "#ffffff",
							border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
							borderRadius: "8px",
							color: isDark ? "#d1d5db" : "#374151",
						}}
						formatter={(value) => `₦${(value as number).toLocaleString()}`}
					/>
					<Legend verticalAlign="bottom" height={36} />
				</PieChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};
