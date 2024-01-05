import { CaretSortIcon } from "@radix-ui/react-icons";
import { Check, Edit, X } from "lucide-react";
import React, { FC, RefObject, useMemo, useRef, useState } from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/tw-merge";
import { getDirtyFields } from "@/modules/common/utils";
import {
  deleteCategory,
  updateCategory,
} from "@/modules/dashboard/actions/category";
import CategoryFilters from "@/modules/dashboard/category/Filters";
import NewCategoryForm from "@/modules/dashboard/category/NewCategoryForm";
import { Category, UpdatableCategoryFields } from "@/modules/dashboard/types";

import CategoryEditCommand, {
  EditCategoriesSchema,
} from "./CategoryEditCommand";
import CategorySelectCommand from "./CategorySelectCommand";

type CategoryComboboxProps = {
  categories: Category[];
  buttonRef: RefObject<HTMLButtonElement>;
  isError: boolean;
};

const CategoryCombobox: FC<CategoryComboboxProps> = ({
  categories: categoriesFromApi,
  buttonRef,
  isError,
}) => {
  const [categories, setCategories] = useState<Category[]>(categoriesFromApi);

  const [incomeFilter, setIncomeFilter] = useState(true);
  const [expenseFilter, setExpenseFilter] = useState(true);

  const [isEditMode, setEditMode] = useState(false);

  const filteredCategories = useMemo(() => {
    const combinedFilter = (c: Category) =>
      (c.isExpense && expenseFilter) || (!c.isExpense && incomeFilter);
    return categories.filter(combinedFilter);
  }, [incomeFilter, expenseFilter, categories]);

  const newCategoryCallback = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const onDeleteHandler = async (id: string) => {
    setCategories((cat) => cat.filter((c) => c.id != id));
    await deleteCategory(id);
  };

  const onEditSubmit = async (
    data: z.infer<typeof EditCategoriesSchema>,
    form: UseFormReturn<z.infer<typeof EditCategoriesSchema>>,
  ) => {
    const { dirtyFields } = form.formState;

    if (Object.keys(dirtyFields).length === 0) {
      setEditMode(false);
      return;
    }

    const cleanedDirtyFields =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getDirtyFields(data, dirtyFields).toUpdate as Record<string, any>;

    console.log({ cleanedDirtyFields });
    return;

    const payload: UpdatableCategoryFields[] = [];
    const categoriesToUpdate: Record<
      string,
      Omit<UpdatableCategoryFields, "id">
    > = {};

    for (const key in cleanedDirtyFields) {
      const c = cleanedDirtyFields[key];
      payload.push(c);
      categoriesToUpdate[c["id"]] = {
        icon: c.icon,
        label: c.label,
        isExpense: c.isExpense,
      };
    }

    // await updateCategory(payload);

    const tempCategories = categories;

    for (let i = 0; i < tempCategories.length; i++) {
      const category = tempCategories[i];
      if (Object.keys(categoriesToUpdate).includes(category.id)) {
        if (categoriesToUpdate[category.id].icon !== undefined) {
          category["icon"] = categoriesToUpdate[category.id].icon as string;
        }
        if (categoriesToUpdate[category.id].label !== undefined) {
          category["label"] = categoriesToUpdate[category.id].label as string;
        }
        if (categoriesToUpdate[category.id].isExpense !== undefined) {
          category["isExpense"] = categoriesToUpdate[category.id]
            .isExpense as boolean;
        }
      }
      tempCategories[i] = category;
    }

    setCategories(tempCategories);
    setEditMode(false);
  };

  const editFormRef = useRef<HTMLFormElement>(null);

  const form = useFormContext();
  const selectedField = form.getValues("categoryId");

  return (
    <FormControl>
      <Popover
        onOpenChange={(isClosing) => {
          if (isClosing) setEditMode(false);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between pl-2",
              !selectedField && "text-muted-foreground",
              categories.find((category) => category.id === selectedField)
                ?.isExpense === false && "border-emerald-600",
            )}
            isError={isError}
            ref={buttonRef}
          >
            {selectedField
              ? (() => {
                  const selected = categories.find(
                    (category) => category.id === selectedField,
                  );
                  if (!selected) return null;
                  return (
                    <div className="flex flex-row items-center gap-1">
                      <Badge
                        variant="secondary"
                        className="mr-2 flex h-6 w-6 items-center justify-center rounded-sm"
                      >
                        {selected.icon}
                      </Badge>
                      <span className="">{selected.label}</span>
                    </div>
                  );
                })()
              : "Select category..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-full w-full p-0" align="start">
          {isEditMode ? (
            <CategoryEditCommand
              categories={filteredCategories}
              submitHandler={onEditSubmit}
              onItemDeleteHandler={onDeleteHandler}
              editFormRef={editFormRef}
            />
          ) : (
            <CategorySelectCommand categories={filteredCategories} />
          )}
          <Separator />
          <div className="flex flex-row items-center justify-between px-3 py-2">
            <CategoryFilters
              incomeFilter={incomeFilter}
              setIncomeFilter={setIncomeFilter}
              expenseFilter={expenseFilter}
              setExpenseFilter={setExpenseFilter}
            />
            {isEditMode ? (
              <div className="flex flex-row items-center gap-2">
                <span className="text-xs font-medium">Confirm</span>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex flex-row items-center gap-1">
                  <Button
                    className="h-5 w-5 bg-emerald-600 p-0.5 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                    onClick={() => {
                      editFormRef &&
                        editFormRef.current &&
                        editFormRef.current.requestSubmit();
                    }}
                  >
                    <Check className="text-stone-50" />
                  </Button>
                  <Button
                    className="h-5 w-5 bg-red-500 p-0.5 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    <X className="text-stone-50" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className="flex h-fit w-fit items-center gap-1 px-2 py-0.5 text-xs font-medium uppercase"
                variant="ghost"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <Edit height={12} width={12} />
                Edit
              </Button>
            )}
          </div>
          <Separator />
          <NewCategoryForm newCategoryCallback={newCategoryCallback} />
        </PopoverContent>
      </Popover>
    </FormControl>
  );
};
export default CategoryCombobox;
