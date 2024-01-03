"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { emailPasswordSignIn } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import SocialSignin from "@/modules/auth/common/SocialSignin";

import AuthFormContainer from "../common/AuthFormContainer";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

const LoginForm = () => {
  const { push } = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await emailPasswordSignIn({
        formFields: [
          { id: "email", value: values.email },
          { id: "password", value: values.password },
        ],
      });

      if (res.status === "OK") {
        await push("/dashboard");
      } else if (res.status === "WRONG_CREDENTIALS_ERROR") {
        form.setError("password", {
          type: "manual",
          message: "Invalid credentials.",
        });
        toast({
          title: "Invalid credentials",
          description:
            "The email and password you entered did not match. Please try again.",
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

  return (
    <AuthFormContainer>
      <section className="relative mx-auto space-y-1 pb-2">
        <h1 className="text-2xl font-medium dark:text-stone-50">
          Welcome back to cashr.
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Log in using a social provider, or through email and password.
        </p>
      </section>
      <SocialSignin disabled={form.formState.isSubmitting} />
      <div className="flex items-center">
        <hr className="w-full dark:border-stone-500" />
        <span className="mx-4 text-sm text-stone-400">or</span>
        <hr className="w-full dark:border-stone-500" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className={
                      form.formState.errors.password &&
                      "border-destructive focus-visible:ring-destructive"
                    }
                    type="password"
                    placeholder="*********"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          >
            Log in
          </Button>
        </form>
      </Form>
      <div className="flex w-full flex-row justify-between text-xs">
        <Link
          href="/auth/reset-password"
          className="text-emerald-700  hover:underline dark:text-emerald-500"
        >
          Forgot your password?
        </Link>
        <div>
          No account yet?{" "}
          <Link
            href="/auth/signup"
            className="text-emerald-700 hover:underline dark:text-emerald-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default LoginForm;
