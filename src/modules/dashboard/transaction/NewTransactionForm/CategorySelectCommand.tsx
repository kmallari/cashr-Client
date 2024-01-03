import { CheckIcon } from "lucide-react";
import React from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tw-merge";
import { Category } from "@/modules/dashboard/types";

type CategoryCommandProps<
  TSchema extends FieldValues,
  TField extends Path<TSchema>,
> = {
  categories: Category[];
  field: ControllerRenderProps<TSchema, TField>;
  onItemSelectHandler: (value: string) => void;
};

const CategoryCommand = <T extends FieldValues, K extends Path<T>>({
  categories,
  field,
  onItemSelectHandler,
}: CategoryCommandProps<T, K>) => {
  return (
    <Command
      filter={(value, search) => {
        const category = JSON.parse(value) as Category;
        return +category.label.includes(search);
      }}
    >
      <CommandInput placeholder="Search categories..." className="h-9" />
      <CommandList>
        <ScrollArea className="h-[17rem] w-full pr-2" type="always">
          <CommandEmpty>Category not found.</CommandEmpty>
          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id}
                value={JSON.stringify(category)}
                onSelect={(val) => onItemSelectHandler(JSON.parse(val).id)}
                className="flex w-full cursor-pointer flex-row items-center px-2 py-1"
              >
                <Badge
                  variant="secondary"
                  className="mr-3 flex h-6 w-6 items-center justify-center rounded-sm"
                >
                  {category.icon}
                </Badge>
                <span className="">{category.label}</span>
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4 rounded-full bg-stone-900 p-[2px]",
                    category.id === field.value ? "opacity-100" : "opacity-0",
                  )}
                  color="white"
                />
                <Badge
                  className={cn(
                    "ml-2",
                    !category.isExpense && "border-emerald-500",
                  )}
                  variant={"outline"}
                >
                  {category.isExpense ? "expense" : "income"}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </Command>
  );
};
export default CategoryCommand;
