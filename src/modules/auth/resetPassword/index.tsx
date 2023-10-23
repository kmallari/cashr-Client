import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React, { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { submitNewPassword } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
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

const formSchema = z.object({
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

const ResetPasswordForm: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await submitNewPassword({
      formFields: [{ id: "password", value: values.password }],
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <h1 className="text-xl font-medium text-stone-800">Reset password</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex w-full flex-row items-center justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                    {showPassword ? (
                      <EyeOff
                        className="h-6 w-6"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        className="h-6 w-6"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
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
          Change
        </Button>
      </form>
    </Form>
  );
};
export default ResetPasswordForm;
