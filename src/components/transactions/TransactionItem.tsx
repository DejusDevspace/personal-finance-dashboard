import React from "react";
import { type Transaction } from "../../types";
import { formatCurrency } from "../../utils/formatters";
// import { type formatDateHelper } from '../../utils/formatters';
import { formatDate as formatDateHelper } from "../../utils/dateHelpers";

interface TransactionItemProps {
	transaction: Transaction;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
	transaction,
}) => {
	const isIncome = transaction.type === "Income";

	return (
		<div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
			<div className="flex items-center gap-4 flex-1">
				<div
					className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
						isIncome ? "bg-green-600" : "bg-red-600"
					}`}
				>
					{isIncome ? "+" : "-"}
				</div>
				<div className="flex-1">
					<p className="font-medium text-gray-900 dark:text-white">
						{transaction.description}
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{transaction.category} •{" "}
						{formatDateHelper(new Date(transaction.date))}
					</p>
				</div>
			</div>
			<p
				className={`font-bold text-lg ${
					isIncome ? "text-green-600" : "text-red-600"
				}`}
			>
				{isIncome ? "+" : "-"}
				{formatCurrency(transaction.amount)}
			</p>
		</div>
	);
};
