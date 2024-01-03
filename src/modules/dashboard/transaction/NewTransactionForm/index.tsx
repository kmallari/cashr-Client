"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, PlusIcon } from "lucide-react";
import React, { type FC, useRef } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Category } from "@/modules/dashboard/types";

import CategoryCombobox from "./CategoryCombobox";

const FormSchema = z.object({
  date: z.date(),
  category: z.string({ required_error: "Category required." }).min(1, {
    message: "Category required.",
  }),
  description: z.preprocess((desc) => desc ?? "", z.string()),
  amount: z
    .string({ required_error: "Enter an amount" })
    .regex(
      new RegExp(
        /^[+]?([1-9][0-9]*(?:[.][0-9]*)?|0*.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/,
      ),
    ),
});

type NewExpenseFormProps = {
  categories: Category[];
};

const NewExpenseForm: FC<NewExpenseFormProps> = ({ categories }) => {
  const categoryRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      description: undefined,
    },
    shouldFocusError: false,
    reValidateMode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const errorHandler: SubmitErrorHandler<z.infer<typeof FormSchema>> = (
    errors,
  ) => {
    if (errors.category && categoryRef.current) {
      categoryRef.current.click();
      return;
    } else if (errors.amount) {
      form.setFocus("amount");
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, errorHandler)}
        className="flex w-full flex-row gap-2"
      >
        <FormField
          key="date"
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex w-1/4 flex-col">
              <DatePicker field={field} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          key="category"
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex w-1/3 flex-col">
              <CategoryCombobox
                field={field}
                categories={categories}
                buttonRef={categoryRef}
                onSelectHandler={(value) => {
                  form.setValue("category", value);
                  form.clearErrors("category");
                  setTimeout(() => form.setFocus("description"), 0);
                }}
                isError={Boolean(form.formState.errors.category)}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-2/3">
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="w-1/6">
              <FormControl>
                <div className="relative">
                  <DollarSign
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    width={16}
                    height={16}
                    color="#9CA3AF"
                  />
                  <Input
                    {...field}
                    placeholder="Price"
                    className="pl-7"
                    isError={Boolean(form.formState.errors.amount)}
                    onFocus={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val)
                        form.setValue(
                          "amount",
                          String(
                            parseFloat(
                              form.getValues("amount").replace(/,/g, ""),
                            ),
                          ),
                        );
                      else form.setValue("amount", "");
                    }}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (val)
                        form.setValue(
                          "amount",
                          val.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 3,
                          }),
                        );
                      else form.setValue("amount", "");
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="1/8">
          <PlusIcon height={20} width={20} />
        </Button>
      </form>
    </Form>
  );
};
export default NewExpenseForm;
