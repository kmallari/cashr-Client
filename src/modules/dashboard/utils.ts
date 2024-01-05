import z from "zod";

import {
  Category,
  CategoryApiRes,
  Transaction,
  TransactionApiRes,
  UpdatableCategoryFields,
} from "./types";

const transformCategoryRes = (
  res: z.infer<typeof CategoryApiRes>,
): Category => {
  return {
    id: res.id,
    createdAt: res.created_at,
    icon: res.icon,
    isExpense: res.is_expense,
    label: res.label,
    updatedAt: res.updated_at,
    userId: res.user_id,
  };
};

const transformTransactionRes = (
  res: z.infer<typeof TransactionApiRes>,
): Transaction => {
  return {
    id: res.id,
    amount: res.amount,
    category: res.category,
    date: res.date,
    description: res.description,
  };
};

const transformEditCategoryReq = (req: UpdatableCategoryFields) => {
  return {
    id: req.id,
    icon: req.icon,
    label: req.label,
    is_expense: req.isExpense,
  };
};

const getRandomFloat = (min: number, max: number, decimals: number) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

export {
  transformCategoryRes,
  transformTransactionRes,
  transformEditCategoryReq,
  getRandomFloat,
};
