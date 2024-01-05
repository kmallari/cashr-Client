import z from "zod";

export const CategoryApiRes = z.object({
  id: z.string().length(36),
  user_id: z.string().length(36),
  label: z.string().min(1).max(24),
  icon: z.string().min(0),
  is_expense: z.boolean(),
  created_at: z.number(),
  updated_at: z.number(),
});

export const CategoryApiResArray = z.array(CategoryApiRes);

export type Category = {
  id: string;
  userId: string;
  label: string;
  icon: string;
  isExpense: boolean;
  createdAt: number;
  updatedAt: number;
};

export type UpdatableCategoryFields = Partial<
  Omit<Category, "id" | "userId" | "createdAt" | "updatedAt">
> & { id: string };

export const TransactionApiRes = z.object({
  id: z.string().length(36),
  date: z.number().min(1),
  category: z.string().min(1),
  description: z.string().min(0),
  amount: z.number().min(0.01),
});

export const TransactionApiResArray = z.array(TransactionApiRes);

export type Transaction = {
  id: string;
  date: number;
  category: string;
  description: string;
  amount: number;
};

export const CreateCategoryPayload = z.object({
  icon: z.string().emoji().or(z.string().length(0)),
  label: z
    .string()
    .min(1, "Please enter a label.")
    .max(24, "Label is too long!"),
  is_expense: z.boolean(),
});

export const HasID = z.object({ id: z.string() });
