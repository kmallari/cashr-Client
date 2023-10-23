"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { type FC } from "react";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
});

const ForgotPasswordForm: FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await sendPasswordResetEmail({
      formFields: [{ id: "email", value: values.email }],
    });

    if (res.status === "OK") {
      toast({
        title: "Password reset link",
        description:
          "The email with the password reset link has been sent if an account with that email exists.",
        duration: 5000,
      });
    } else {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-row items-center justify-between gap-2 pt-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className={
                    form.formState.errors.email &&
                    "border-destructive focus-visible:ring-destructive"
                  }
                  placeholder="person@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-1/2"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Send email
        </Button>
      </form>
    </Form>
  );
};
export default ForgotPasswordForm;
