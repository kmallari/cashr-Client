"use server";

import { cache } from "react";
import z from "zod";

import http from "@/lib/api/http.service";

import { NewCategoryFormSchema as NewCategoryFormSchema } from "../category/NewCategoryForm";
import { EditCategoriesSchema } from "../transaction/NewTransactionForm/CategoryEditCommand";
import {
  Category,
  CategoryApiRes,
  CategoryApiResArray,
  CreateCategoryPayload,
} from "../types";
import { transformCategoryRes, transformEditCategoryReq } from "../utils";

const getCategories = cache(async (): Promise<Category[]> => {
  const res = await http.get("/api/categories", CategoryApiResArray);

  const categories = res.map(transformCategoryRes);
  return categories;
});

const createCategory = cache(
  async (data: z.infer<typeof NewCategoryFormSchema>) => {
    const res = await http.post<
      typeof CategoryApiRes,
      z.infer<typeof CreateCategoryPayload>
    >(
      "/api/categories",
      {
        label: data.label,
        icon: data.icon,
        is_expense: data.isExpense,
      },
      CategoryApiRes,
    );

    return transformCategoryRes(res);
  },
);

const updateCategory = cache(
  async (request: z.infer<typeof EditCategoriesSchema>) => {
    const transformedRequest = transformEditCategoryReq(request);

    await http.put("/api/categories", transformedRequest, z.null());
  },
);

const deleteCategory = cache(async (id: string) => {
  await http.delete(`/api/categories/${id}`, z.string());
});

export { getCategories, createCategory, updateCategory, deleteCategory };
