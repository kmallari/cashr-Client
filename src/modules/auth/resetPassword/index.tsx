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
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

const ResetPasswordForm: FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await submitNewPassword({
        formFields: [{ id: "password", value: values.password }],
      });
      if (res.status === "OK") {
        toast({
          title: "Password reset",
          description: "Your password has been reset.",
        });
      } else if (res.status === "FIELD_ERROR") {
        const formFields = res.formFields;
        formFields.forEach((field) => {
          form.setError(field.id as "password", {
            type: "manual",
            message: field.error,
          });
        });
      } else if (res.status === "RESET_PASSWORD_INVALID_TOKEN_ERROR") {
        toast({
          title: "Invalid token",
          description: "The password reset token is invalid.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
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
                <div className="flex flex-row justify-between gap-2">
                  <div className="relative w-2/3">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full"
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
                  <Button
                    type="submit"
                    className="w-1/3"
                    disabled={form.formState.isSubmitting}
                    loading={form.formState.isSubmitting}
                  >
                    Change
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ResetPasswordForm;
