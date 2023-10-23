"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { sendVerificationEmail } from "supertokens-auth-react/recipe/emailverification";
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
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "kmallari21stlit@gmail.com",
      password: "SamsungApple1",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const signUpRes = await emailPasswordSignUp({
        formFields: [
          { id: "email", value: values.email },
          { id: "password", value: values.password },
        ],
      });

      if (signUpRes.status === "FIELD_ERROR") {
        const formFields = signUpRes.formFields;
        formFields.forEach((field) => {
          form.setError(field.id as "email" | "password", {
            type: "manual",
            message: field.error,
          });
        });
      } else if (signUpRes.status === "OK") {
        const verificationEmailRes = await sendVerificationEmail();

        if (verificationEmailRes.status === "EMAIL_ALREADY_VERIFIED_ERROR") {
          toast({
            title: "Email is already verified.",
            description: "Please log in to your account.",
            variant: "destructive",
          });
        } else if (verificationEmailRes.status === "OK") {
          return push("/auth/verify-email");
        }
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        toast({
          title: "An error occurred while signing up.",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "An unknown error occurred.",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
      <div className="rounded-lg shadow-2xl shadow-gray-300">
        <div className="flex h-fit w-full flex-col gap-6 rounded-lg border border-stone-200 bg-gradient-to-t from-stone-50 to-white/20 p-12 shadow-inner shadow-white backdrop-blur-sm">
          <section className="relative mx-auto space-y-1 pb-2">
            <h1 className="text-2xl font-medium">Sign up to Website.</h1>
            <p className="text-sm text-stone-500">
              Sign up using a social provider, or through email and password.
            </p>
          </section>
          <SocialSignin disabled={form.formState.isSubmitting} />
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
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                loading={form.formState.isSubmitting}
              >
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
