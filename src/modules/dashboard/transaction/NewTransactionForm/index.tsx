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
  categoryId: z.string({ required_error: "Category required." }).length(36, {
    message: "Category required.",
  }),
  description: z.preprocess((desc) => desc ?? "", z.string()),
  sourceId: z
    .string({ required_error: "Source required" })
    .length(36, { message: "Source required" }),
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
    if (errors.categoryId && categoryRef.current) {
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
        className="grid grid-cols-6 gap-2"
      >
        <FormField
          key="date"
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-1 flex flex-col">
              <DatePicker field={field} />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          key="categoryId"
          control={form.control}
          name="categoryId"
          render={({ formState }) => (
            <FormItem className="col-span-1 flex flex-col">
              <CategoryCombobox
                categories={categories}
                buttonRef={categoryRef}
                isError={Boolean(formState.errors.categoryId)}
              />
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormControl>
                <Input {...field} placeholder="Description" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="col-span-1 flex flex-row gap-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-2/3">
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
          <Button type="submit" className="w-1/3">
            <PlusIcon height={20} width={20} />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewExpenseForm;
