import dayjs from "dayjs";
import React, { type FC } from "react";

import { ClientCompWithRequiredSession } from "@/modules/auth/common/protectedPage";
import { ServerCompWithSessionInfo } from "@/modules/auth/common/serverCompWithSessionInfo";
import NewExpenseForm from "@/modules/expenses/NewExpenseForm";
import { columns, Payment } from "@/modules/expenses/table/columns";
import { DataTable } from "@/modules/expenses/table/data-table";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  const now = Date.now();
  const date = dayjs(now).format("MM/DD/YYYY");
  return [
    {
      id: "728ed52f",
      date: date,
      category: "Phone",
      description: "iPhone payment",
      amount: 100,
    },
    {
      id: "728ed52x",
      date: date,
      category: "Skin Hygiene",
      description:
        "Went to skin desyre and bought some products. Also got a facial and cleaning. Went to skin desyre and bought some products. Also got a facial and cleaning. Went to skin desyre and bought some products. Also got a facial and cleaning.",
      amount: 100,
    },
  ];
}

const Dashboard: FC = async () => {
  const data = await getData();
  return (
    <main className="w-full space-y-2">
      <ServerCompWithSessionInfo />
      <ClientCompWithRequiredSession />

      <NewExpenseForm />
      <DataTable columns={columns} data={data} />
    </main>
  );
};

export default Dashboard;
