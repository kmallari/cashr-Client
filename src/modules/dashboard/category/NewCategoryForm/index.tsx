"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SmilePlus } from "lucide-react";
import React, { type FC } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EmojiPicker, { Emoji } from "@/components/ui/emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/tw-merge";
import { createCategory } from "@/modules/dashboard/actions/category";
import { Category } from "@/modules/dashboard/types";

export const NewCategoryFormSchema = z.object({
  icon: z.string().emoji().or(z.string().length(0)),
  label: z
    .string()
    .min(1, "Please enter a label.")
    .max(24, "Label is too long!"),
  isExpense: z.boolean(),
});

type NewCategoryFormProps = {
  newCategoryCallback: (newCategory: Category) => void;
};

const NewCategoryForm: FC<NewCategoryFormProps> = ({ newCategoryCallback }) => {
  const form = useForm<z.infer<typeof NewCategoryFormSchema>>({
    resolver: zodResolver(NewCategoryFormSchema),
    defaultValues: {
      icon: "",
      label: "",
      isExpense: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof NewCategoryFormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const res = await createCategory(data);
    newCategoryCallback(res);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
        className="flex w-full flex-row gap-2 p-2"
      >
        <FormField
          control={form.control}
          key="isExpense"
          name="isExpense"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "h-full w-24 rounded-md border border-transparent bg-accent text-xs uppercase ",
                    field.value
                      ? "border-emerald-400 bg-emerald-100 hover:bg-emerald-200 dark:border-emerald-700 dark:bg-emerald-900 dark:hover:bg-emerald-800"
                      : "border border-border text-red-600 hover:bg-stone-200 dark:text-red-400 dark:hover:bg-stone-900",
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
                    className="flex h-full w-full cursor-pointer items-center justify-center text-xs "
                  >
                    {field.value ? "Expense" : "Income"}
                  </Label>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          key="icon"
          control={form.control}
          name="icon"
          render={({ formState }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="h-10 w-10 p-0"
                    disabled={formState.isSubmitting}
                  >
                    {form.getValues("icon") || (
                      <SmilePlus className="h-4 w-4 opacity-20" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit border-0 bg-transparent p-0">
                  <FormControl>
                    <EmojiPicker
                      onClickHandler={(emoji: Emoji) => {
                        form.setValue("icon", emoji.native);
                      }}
                    />
                  </FormControl>
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          key="label"
          control={form.control}
          name="label"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <Input
                  isError={Boolean(formState.errors.label)}
                  {...field}
                  placeholder={
                    formState.errors.label
                      ? formState.errors.label.message
                      : "New category..."
                  }
                  disabled={formState.isSubmitting}
                  maxLength={24}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-10 w-10 p-0"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          <PlusIcon />
        </Button>
      </form>
    </Form>
  );
};

export default NewCategoryForm;
