import AnimatedCounter from "./AnimatedCounter";
import FinancialSummaryCards from "./FinancialSummaryCards";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  // Flatten the accounts array
  const flattenedAccounts = accounts.flat();
  const monthlySpending = 2000;
  const savingsGoal = 10000;

  console.log("Flattened accounts:", flattenedAccounts);

  return (
    <section className="total-balance">
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
