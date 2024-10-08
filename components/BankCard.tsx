"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(account?.shareableId);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card block relative"
      >
        <div className="bank-card_content">
          <div>
            <h1 className="text-16 font-semibold text-white">{account.name}</h1>
            <p className="font-ibm-plex-serif font-black text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-12 font-semibold text-white">{userName}</h1>
              <h2 className="text-12 font-semibold text-white">●●/●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>
        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/mastercard.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-14"
          />
        </div>
        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute top-0 left-0"
        />
      </Link>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Copy card ID"
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-white" />
        ) : (
          <Copy className="h-4 w-4 text-white" />
        )}
      </button>
    </div>
  );
};

export default BankCard;
