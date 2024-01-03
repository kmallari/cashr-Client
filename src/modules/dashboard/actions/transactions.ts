import { cache } from "react";

import http from "@/lib/api/http.service";

import { Transaction, TransactionApiResArray } from "../types";
import { transformTransactionRes } from "../utils";

const getTransactions = cache(async (): Promise<Transaction[]> => {
  // const transactionsRes = await http.get(
  //   "/api/transactions",
  //   TransactionApiResArray,
  // );

  // const transactions = transactionsRes.map(transformTransactionRes);
  // return transactions;
  return [];
});

export { getTransactions };
