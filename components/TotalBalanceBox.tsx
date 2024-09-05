"use client";

import { useEffect, useState } from "react";
import FinancialSummaryCards from "./FinancialSummaryCards";
import { calculateMonthlySpending } from "@/lib/actions/bank.actions";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  // Flatten the accounts array
  const [monthlySpending, setMonthlySpending] = useState<number>(0);
  const [savingsGoal, setSavingsGoal] = useState<number>(5000);
  const handleUpdateSavingsGoal = (newGoal: number) => {
    setSavingsGoal(newGoal);
  };

  useEffect(() => {
    const fetchMonthlySpending = async () => {
      if (accounts.length > 0) {
        const bankId = accounts[0].appwriteItemId;
        const spending = await calculateMonthlySpending(bankId);
        setMonthlySpending(spending);
      }
    };

    fetchMonthlySpending();
  }, [accounts]);

  const flattenedAccounts = accounts.flat();

  console.log("Flattened accounts:", flattenedAccounts);

  return (
    <FinancialSummaryCards
      totalBalance={totalCurrentBalance}
      monthlySpending={monthlySpending}
      savingsGoal={savingsGoal}
      onUpdateSavingsGoal={handleUpdateSavingsGoal}
    />
  );
};

export default TotalBalanceBox;
