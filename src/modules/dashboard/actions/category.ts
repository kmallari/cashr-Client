"use server";

import { cache } from "react";
import z from "zod";

import http from "@/lib/api/http.service";

import { NewCategoryFormSchema } from "../category/NewCategoryForm";
import {
  Category,
  CategoryApiRes,
  CategoryApiResArray,
  CreateCategoryPayload,
  UpdatableCategoryFields,
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

const updateCategory = async (request: UpdatableCategoryFields[]) => {
  const transformedRequest = request.map(transformEditCategoryReq);
  console.log({ transformedRequest });
  await http.put("/api/categories", transformedRequest, z.string());
};

const deleteCategory = async (id: string) => {
  await http.delete(`/api/categories/${id}`, CategoryApiRes);
};

export { getCategories, createCategory, updateCategory, deleteCategory };
