import React, { type FC } from "react";

import { getCategories } from "@/modules/dashboard/actions/category";
import { getTransactions } from "@/modules/dashboard/actions/transactions";
import NewTransactionForm from "@/modules/dashboard/transaction/NewTransactionForm";
import { columns } from "@/modules/dashboard/transaction/table/columns";
import { DataTable } from "@/modules/dashboard/transaction/table/data-table";

const Dashboard: FC = async () => {
  const categories = await getCategories();
  const transactions = await getTransactions();

  return (
    <main className="w-full space-y-2">
      <NewTransactionForm categories={categories} />
      <DataTable columns={columns} data={transactions} />
    </main>
  );
};

export default Dashboard;
