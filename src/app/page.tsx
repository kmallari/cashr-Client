"use client";
import { JSXElementConstructor, ReactElement, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import z from "zod";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
  useForm,
} from "react-hook-form";
import { validators } from "tailwind-merge";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Divide } from "lucide-react";
import { Fleur_De_Leah } from "next/font/google";
const Schema = z.object({ checked: z.boolean() });

const Home = () => {
  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      checked: false,
    },
    resolver: zodResolver(Schema),
  });

  const onSubmit = (d: any) => console.log;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}></form>
        <FormField
          control={form.control}
          name="checked"
          key="checked"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div>
                  <Checkbox
                    id="c"
                    checked={field.value}
                    className="hidden"
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="c">
                    {field.value ? "check" : "not checked"}
                  </Label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default Home;
