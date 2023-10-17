"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { emailPasswordSignUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
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
import SocialSignin from "@/modules/auth/common/socialSignin";

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

export function SignupForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const res = await emailPasswordSignUp({
        formFields: [
          { id: "email", value: values.email },
          { id: "password", value: values.password },
        ],
      });
      console.log(res);
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        console.error({ err });
        window.alert("Oops! Something went wrong.");
      }
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
      <div className="rounded-lg shadow-2xl shadow-gray-300">
        <div className="flex h-fit w-full flex-col gap-6 rounded-lg border border-stone-200 bg-gradient-to-t from-stone-50 to-white/20 p-12 shadow-inner shadow-white backdrop-blur-sm">
          <section className="relative mx-auto space-y-1 pb-2">
            <h1 className="text-2xl font-medium">Sign up to cashr.</h1>
            <p className="text-sm text-stone-500">
              Sign up using a social provider, or through email and password.
            </p>
          </section>
          <SocialSignin />
          <div className="flex items-center">
            <hr className="w-full" />
            <span className="mx-4 text-sm text-gray-400">or</span>
            <hr className="w-full" />
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
                          form.formState.errors.email &&
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
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </Form>
          <div className="w-full text-xs">
            <div>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-emerald-700 hover:text-emerald-800"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
