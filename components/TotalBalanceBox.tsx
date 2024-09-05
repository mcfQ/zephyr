"use client";

import { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import FinancialSummaryCards from "./FinancialSummaryCards";
import { calculateMonthlySpending } from "@/lib/actions/bank.actions";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  // Flatten the accounts array
  const [monthlySpending, setMonthlySpending] = useState<number>(0);

  useEffect(() => {
    const fetchMonthlySpending = async () => {
      if (accounts.length > 0) {
        const bankId = accounts[0].appwriteItemId;
        const spending = await calculateMonthlySpending(bankId);
        setMonthlySpending(spending);
      }
    };

    fetchMonthlySpending();
  });
  const flattenedAccounts = accounts.flat();
  const savingsGoal = 10000;

  console.log("Flattened accounts:", flattenedAccounts);

  return (
    <section className="total-balance grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <FinancialSummaryCards
        totalBalance={totalCurrentBalance}
        monthlySpending={monthlySpending}
        savingsGoal={savingsGoal}
      />

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
