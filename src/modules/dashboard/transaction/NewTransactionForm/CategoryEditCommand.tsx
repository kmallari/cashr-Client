import { zodResolver } from "@hookform/resolvers/zod";
import { Smile, Trash } from "lucide-react";
import React, { useRef } from "react";
import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

import styles from "@/app/dashboard/styles.module.css";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import EmojiPicker, { Emoji } from "@/components/ui/emoji-picker";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/tw-merge";
import { NewCategoryFormSchema } from "@/modules/dashboard/category/NewCategoryForm";
import { Category, HasID } from "@/modules/dashboard/types";
import { getRandomFloat } from "@/modules/dashboard/utils";

export const EditCategoriesSchema = z.object({
  categories: z.array(NewCategoryFormSchema.merge(HasID)),
});

type CategoryEditCommandProps = {
  categories: Category[];
  onItemDeleteHandler: (id: string) => void;
  submitHandler: (
    data: z.infer<typeof EditCategoriesSchema>,
    form: UseFormReturn<z.infer<typeof EditCategoriesSchema>>,
  ) => void;
  editFormRef: React.RefObject<HTMLFormElement>;
};

const CategoryEditCommand = ({
  categories,
  onItemDeleteHandler,
  submitHandler,
  editFormRef,
}: CategoryEditCommandProps) => {
  const form = useForm<z.infer<typeof EditCategoriesSchema>>({
    resolver: zodResolver(EditCategoriesSchema),
    defaultValues: {
      categories: [...categories],
    },
  });

  const { fields } = useFieldArray({
    name: "categories",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit((data) => submitHandler(data, form))(e);
        }}
        ref={editFormRef}
      >
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
                {fields.map((category, i) => (
                  <CommandItem
                    key={category.id}
                    value={JSON.stringify(category)}
                    onSelect={console.log}
                    className="flex w-full flex-row items-center gap-1 py-1 pl-2 pr-1 aria-selected:bg-inherit"
                  >
                    <FormField
                      key={`categories.${i}.icon`}
                      control={form.control}
                      name={`categories.${i}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger>
                                <Button
                                  variant={"outline"}
                                  className="flex h-6 min-h-[24px] min-w-[24px] items-center justify-center rounded-sm p-0"
                                  type="button"
                                >
                                  <span>{field.value}</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="center"
                                className="w-fit border-0 bg-transparent p-0"
                              >
                                <EmojiPicker
                                  onClickHandler={(emoji: Emoji) => {
                                    form.setValue(
                                      `categories.${i}.icon`,
                                      emoji.native,
                                      {
                                        shouldDirty: true,
                                      },
                                    );
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      key={`categories.${i}.label`}
                      control={form.control}
                      name={`categories.${i}.label`}
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              defaultValue={category.label}
                              className="h-6 rounded-sm px-2 focus-visible:ring-1"
                              isError={Boolean(fieldState.error)}
                              maxLength={24}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="ml-auto flex flex-row gap-1">
                      <FormField
                        key={`categories.${i}.isExpense`}
                        control={form.control}
                        name={`categories.${i}.isExpense`}
                        render={({ field, formState }) => (
                          <FormItem>
                            <FormControl>
                              <div
                                className={cn(
                                  "mx-2 h-fit rounded-full border bg-transparent text-xs hover:bg-accent",
                                  !field.value &&
                                    "border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-700/50",
                                )}
                              >
                                <Checkbox
                                  id={field.name}
                                  className="hidden"
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  disabled={formState.isSubmitting}
                                />
                                <Label
                                  htmlFor={field.name}
                                  className="flex h-full w-full cursor-pointer items-center justify-center px-2.5 py-0.5 text-xs font-semibold lowercase"
                                >
                                  {field.value ? "Expense" : "Income"}
                                </Label>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        variant="destructive"
                        type="button"
                        className={cn(
                          "h-6 w-6 rounded-sm border p-1 ring-1 ring-red-600 hover:bg-red-700",
                          i % 2 === 0
                            ? styles["trash-icon-even"]
                            : styles["trash-icon-odd"],
                        )}
                        style={{
                          animationDelay: `${getRandomFloat(0.01, 0.3, 2)}s`,
                          animationDuration: `${getRandomFloat(0.2, 0.4, 2)}s`,
                        }}
                        onClick={async () => {
                          await onItemDeleteHandler(category.id);
                        }}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </form>
    </Form>
  );
};

export default CategoryEditCommand;
