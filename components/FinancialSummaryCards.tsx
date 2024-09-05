import React, { useState } from "react";
import { formatAmount } from "@/lib/utils";
import { LandmarkIcon, CreditCard, PiggyBank } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FinancialSummaryCards = ({
  totalBalance,
  monthlySpending,
  savingsGoal,
  onUpdateSavingsGoal,
}: FinancialSummaryProps) => {
  const [editingSavingsGoal, setEditingSavingsGoal] = useState(false);
  const [newSavingsGoal, setNewSavingsGoal] = useState(savingsGoal.toString());

  const handleSavingsGoalUpdate = () => {
    const updatedGoal = parseFloat(newSavingsGoal);
    if (!isNaN(updatedGoal)) {
      onUpdateSavingsGoal(updatedGoal);
      setEditingSavingsGoal(false);
    }
  };

  const daysLeft =
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() -
    new Date().getDate();

  const cardStyle =
    "bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-full";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white rounded-lg shadow-md">
      <div className={cardStyle}>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Personal balance
            </h3>
            <LandmarkIcon className="text-gray-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">
            <AnimatedCounter amount={totalBalance} />
          </div>
        </div>
      </div>

      <div className={cardStyle}>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Spent this month
            </h3>
            <CreditCard className="text-gray-600" size={20} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mt-4">
            {formatAmount(monthlySpending)}
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">{daysLeft} days left</div>
      </div>

      <div className={cardStyle}>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Savings Goal
            </h3>
            <PiggyBank className="text-gray-600" size={20} />
          </div>
          {editingSavingsGoal ? (
            <div className="flex items-center mt-4">
              <Input
                type="number"
                value={newSavingsGoal}
                onChange={(e) => setNewSavingsGoal(e.target.value)}
                className="mr-2 bg-white text-gray-800 border-gray-300"
              />
              <Button
                onClick={handleSavingsGoalUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-900 mt-4">
                {formatAmount(savingsGoal)}
              </div>
              <button
                onClick={() => setEditingSavingsGoal(true)}
                className="text-sm text-blue-600 mt-2 hover:underline"
              >
                Edit Goal
              </button>
            </>
          )}
        </div>
        <div className="text-sm text-gray-600 mt-2">Target for this month</div>
      </div>
    </div>
  );
};

export default FinancialSummaryCards;
