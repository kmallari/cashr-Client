import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { type FC, useEffect, useState } from "react";
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const { push } = useRouter();

  useEffect(() => {
    if (isFormSubmitted) {
      const interval = setInterval(() => {
        if (countdown === 0) return;
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormSubmitted]);

  useEffect(() => {
    if (countdown === 0) {
      push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

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
        setIsFormSubmitted(true);
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

  if (isFormSubmitted) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium text-emerald-600">
          Your password has been reset!
        </h1>
        <p className="text-sm text-stone-500">
          Redirecting to the login page in {countdown} seconds...
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <h1 className="text-xl font-medium text-stone-800">Reset password</h1>
      {isFormSubmitted ? (
        "submitted"
      ) : (
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
                      disabled={form.formState.isSubmitting || isFormSubmitted}
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
      )}
    </Form>
  );
};
export default ResetPasswordForm;
