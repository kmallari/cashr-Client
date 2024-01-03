import React, { type FC } from "react";

import { Separator } from "@/components/ui/separator";

import FilterToggle from "./FilterToggle";

type CategoryFilterProps = {
  incomeFilter: boolean;
  setIncomeFilter: React.Dispatch<React.SetStateAction<boolean>>;
  expenseFilter: boolean;
  setExpenseFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoryFilter: FC<CategoryFilterProps> = ({
  incomeFilter,
  setIncomeFilter,
  expenseFilter,
  setExpenseFilter,
}) => {
  return (
    <div>
      <div className="flex flex-row gap-3 text-xs">
        <h4 className="font-medium uppercase">Filters</h4>
        <div className="flex flex-row gap-2">
          <FilterToggle
            pressed={expenseFilter}
            onPressedChange={() => setExpenseFilter((prev) => !prev)}
            filterName="Expense"
          />
          <Separator orientation="vertical" />
          <FilterToggle
            pressed={incomeFilter}
            onPressedChange={() => setIncomeFilter((prev) => !prev)}
            filterName="Income"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
