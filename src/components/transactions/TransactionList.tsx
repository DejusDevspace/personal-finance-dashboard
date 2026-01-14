import React from "react";
import { Card } from "../common/Card";
import { TransactionItem } from "./TransactionItem";
import { type Transaction } from "../../types";

interface TransactionListProps {
	transactions: Transaction[];
	isLoading?: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
	transactions,
	isLoading = false,
}) => {
	return (
		<Card>
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
				Recent Transactions
			</h3>
			{isLoading ? (
				<div className="flex items-center justify-center h-64">
					<div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 rounded-full animate-spin" />
				</div>
			) : transactions.length === 0 ? (
				<div className="py-12 text-center text-gray-500 dark:text-gray-400">
					<p>No transactions found</p>
				</div>
			) : (
				<div>
					{transactions.map((transaction, index) => (
						<TransactionItem
							key={transaction.id || index}
							transaction={transaction}
						/>
					))}
				</div>
			)}
		</Card>
	);
};
