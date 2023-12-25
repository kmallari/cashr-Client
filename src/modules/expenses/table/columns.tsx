"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "date",
    header: () => {
      return (
        <div className="text-left">
          <span>Date</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => (
      <div className="text-left">
        <span>Category</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => (
      <div className="text-center">
        <span>Description</span>
      </div>
    ),
    cell: ({ cell }) => {
      const val = cell.getValue() as Payment["description"];
      return (
        <div className="overflow-ellipsis text-left">
          <span>
            {val.length > window.innerWidth / 20
              ? val.slice(0, window.innerWidth / 20) + "..."
              : val}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-right">
        <span>Amount</span>
      </div>
    ),
    cell: ({ cell }) => (
      <div className="text-right">
        <span>
          {
            // Format the amount as USD.
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PHP",
            }).format(cell.getValue() as Payment["amount"])
          }
        </span>
      </div>
    ),
  },
];
