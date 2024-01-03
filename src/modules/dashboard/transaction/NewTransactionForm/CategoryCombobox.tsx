import { CaretSortIcon } from "@radix-ui/react-icons";
import { Check, Edit, X } from "lucide-react";
import React, { RefObject, useMemo, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import z, { ZodIntersection } from "zod";

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
import { Category } from "@/modules/dashboard/types";

import CategoryEditCommand, {
  EditCategoriesSchema,
} from "./CategoryEditCommand";
import CategorySelectCommand from "./CategorySelectCommand";
import { transformEditCategoryReq } from "../../utils";

type CategoryComboboxProps<
  TSchema extends FieldValues,
  TField extends Path<TSchema>,
> = {
  categories: Category[];
  field: ControllerRenderProps<TSchema, TField>;
  buttonRef: RefObject<HTMLButtonElement>;
  onSelectHandler: (value: string) => void;
  isError: boolean;
};

const CategoryCombobox = <T extends FieldValues, K extends Path<T>>({
  categories: categoriesFromApi,
  field,
  buttonRef,
  onSelectHandler,
  isError,
}: CategoryComboboxProps<T, K>) => {
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
    // TODO: Shit not working ?
    setCategories((cat) => cat.filter((c) => c.id != id));
    await deleteCategory(id);
  };

  const onEditSubmit = async (
    data: z.infer<typeof EditCategoriesSchema>,
    form: UseFormReturn<z.infer<typeof EditCategoriesSchema>>,
  ) => {
    const { dirtyFields } = form.formState;
    const cleanedDirtyFields =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getDirtyFields(data, dirtyFields).categories as Record<string, any>;
    const payload: {
      icon: string;
      label: string;
      isExpense: boolean;
      id: string;
    }[] = [];

    for (const key in cleanedDirtyFields) {
      payload.push(cleanedDirtyFields[key]);
    }

    await updateCategory({ categories: payload });

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
        </pre>
      ),
    });
  };

  const editFormRef = useRef<HTMLFormElement>(null);

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
              !field.value && "text-muted-foreground",
              categories.find((category) => category.id === field.value)
                ?.isExpense === false && "border-emerald-600",
            )}
            isError={isError}
            ref={buttonRef}
          >
            {field.value
              ? (() => {
                  const selected = categories.find(
                    (category) => category.id === field.value,
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
            <CategorySelectCommand
              categories={filteredCategories}
              field={field}
              onItemSelectHandler={onSelectHandler}
            />
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
