import React, { createContext, useState } from "react";
import type { DashboardData, Transaction } from "../types";

interface DataContextType {
	data: DashboardData | null;
	setData: (data: DashboardData) => void;
	addTransaction: (transaction: Transaction) => void;
	isLoading: boolean;
	setIsLoading: (loading: boolean) => void;
	error: string | null;
	setError: (error: string | null) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
	undefined
);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [data, setData] = useState<DashboardData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const addTransaction = (transaction: Transaction) => {
		if (data) {
			setData({
				...data,
				transactions: [...data.transactions, transaction],
			});
		}
	};

	return (
		<DataContext.Provider
			value={{
				data,
				setData,
				addTransaction,
				isLoading,
				setIsLoading,
				error,
				setError,
			}}
		>
			{children}
		</DataContext.Provider>
	);
};
