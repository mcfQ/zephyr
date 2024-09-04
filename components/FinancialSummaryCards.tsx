import React from "react";
import { formatAmount } from "@/lib/utils";

interface FinancialSummaryProps {
  totalBalance: number;
  monthlySpending: number;
  savingsGoal: number;
}

const FinancialSummaryCards: React.FC<FinancialSummaryProps> = ({
  totalBalance,
  monthlySpending,
  savingsGoal,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Total Balance
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {formatAmount(totalBalance)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Monthly Spending
        </h3>
        <p className="text-2xl font-bold text-green-600">
          {formatAmount(monthlySpending)}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Savings Goal
        </h3>
        <p className="text-2xl font-bold text-purple-600">
          {formatAmount(savingsGoal)}
        </p>
      </div>
    </div>
  );
};

export default FinancialSummaryCards;
