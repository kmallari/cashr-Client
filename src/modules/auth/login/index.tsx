"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BsArrowRightShort, BsGithub, BsGoogle } from "react-icons/bs";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Email must be valid.",
  }),
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_DOMAIN;

export function LoginForm() {
  const { push } = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const socialSignin = async (type: "github" | "google") => {
    const redirectURI = encodeURIComponent(
      `${CLIENT_URL}/auth/callback/${type}`,
    );

    const res = await fetch(
      `/api/auth/authorisationurl?thirdPartyId=${type}&redirectURIOnProviderDashboard=${redirectURI}`,
    );
    const data = (await res.json()) as {
      status: string;
      urlWithQueryParams: string;
    };

    console.log(data.urlWithQueryParams);

    push(data.urlWithQueryParams);
  };

  return (
    <div className="relative mx-auto  flex min-h-screen max-w-lg items-center px-4">
      <div className="flex h-fit w-full flex-col gap-6 rounded-lg border border-stone-200 bg-white/20 p-12 shadow-inner backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <Link href="https://accounts.google.com/o/oauth2/auth?client_id=228712669691-15um1ok05lvdf95jc3shncpnjjfkrpm6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/google/callback&response_type=code&scope=email profile">
            <Button
              onClick={(e) => {
                e.preventDefault();
                socialSignin("google");
              }}
              type="button"
              variant="outline"
              className="flex w-full flex-row items-center justify-between gap-4 hover:bg-stone-900 hover:text-stone-50"
            >
              <div className="flex items-center gap-3">
                <BsGoogle />
                Continue with Google
              </div>
              <BsArrowRightShort />
            </Button>
          </Link>
          <Button
            onClick={(e) => {
              e.preventDefault();
              socialSignin("github");
            }}
            type="button"
            variant="outline"
            className="flex w-full flex-row items-center justify-between gap-4 hover:bg-stone-900 hover:text-stone-50"
          >
            <div className="flex items-center gap-3">
              <BsGithub />
              Continue with GitHub
            </div>
            <BsArrowRightShort />
          </Button>
        </div>
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
                    <Input placeholder="person@mail.com" {...field} />
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
                    <Input type="password" placeholder="*********" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
