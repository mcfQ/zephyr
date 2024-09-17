import BankCard from "@/components/BankCard";
import { ShieldCheck } from "lucide-react";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={accounts.id}
                  account={a}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
        </div>
        <div className="mt-12 bg-gray-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-blue-500" />
            Security Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Keep your card information confidential</li>
            <li>Enable notifications for all transactions</li>
            <li>Regularly review your account statements</li>
            <li>Use strong, unique passwords for online banking</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
