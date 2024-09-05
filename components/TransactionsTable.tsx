import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}
    >
      {status}
    </span>
  );
};

const CategoryBadge = ({ category }: { category: string }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "travel":
        return "bg-blue-500 text-white";
      case "transfer":
        return "bg-red-500 text-white";
      case "payment":
        return "bg-green-500 text-white";
      case "food and drink":
        return "bg-pink-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCategoryDisplay = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "food and drink": "Eating Out",
      // Add more mappings here if needed
    };
    return categoryMap[category.toLowerCase()] || category;
  };

  const originalCategory = category;
  const displayCategory = getCategoryDisplay(category);
  const needsTooltip = displayCategory !== originalCategory;

  const words = category.split(" ");
  const isMultiWord = words.length > 1;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span
            className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(originalCategory)}`}
            style={{
              minWidth: "60px",
              fontSize: displayCategory.length > 10 ? "0.65rem" : "0.75rem",
            }}
          >
            {displayCategory}
          </span>
        </TooltipTrigger>
        {needsTooltip && (
          <TooltipContent>
            <p>{originalCategory}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="w-[30%] py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Transaction
            </TableHead>
            <TableHead className="w-[15%] py-3 px-6 text-right text-sm font-semibold text-gray-600">
              Amount
            </TableHead>
            <TableHead className="w-[15%] py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Status
            </TableHead>
            <TableHead className="w-[20%] py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Date
            </TableHead>
            <TableHead className="hidden md:table-cell w-[10%] py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Channel
            </TableHead>
            <TableHead className="hidden md:table-cell w-[10%] py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Category
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t: Transaction, index: number) => {
            const status = getTransactionStatus(new Date(t.date));
            const amount = formatAmount(t.amount);
            const isDebit = t.type === "debit" || parseFloat(t.amount) < 0;

            return (
              <TableRow
                key={t.id}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50",
                )}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      {isDebit ? (
                        <ArrowDownRight className="w-5 h-5 text-red-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {removeSpecialCharacters(t.name)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-right">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isDebit ? "text-red-600" : "text-green-600",
                    )}
                  >
                    {isDebit ? `-${amount.replace("-", "")}` : amount}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell className="py-4 px-6">
                  <span className="text-sm text-gray-600">
                    {formatDateTime(new Date(t.date)).dateTime}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell py-4 px-6">
                  <span className="text-sm text-gray-600 capitalize">
                    {t.paymentChannel}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell py-4 px-6">
                  <CategoryBadge category={t.category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
