"use client";

import React, { type FC } from "react";
import { getResetPasswordTokenFromURL } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import BackToLogin from "@/modules/auth/common/backToLogin";
import ResetPasswordForm from "@/modules/auth/resetPassword";
import SendResetPasswordEmailForm from "@/modules/auth/resetPassword/sendEmailForm";
import GridGradientBg from "@/modules/common/gridGradientBg";

const ForgotPassword: FC = () => {
  const token = getResetPasswordTokenFromURL();

  const display = token ? (
    <ResetPasswordForm />
  ) : (
    <>
      <BackToLogin />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">Forgot password?</h1>
        <p className="text-sm text-stone-500">
          Enter your email in the field below and we will send you a password
          reset link if an account with that email exists.
        </p>
        <SendResetPasswordEmailForm />
      </div>
    </>
  );

  return (
    <main className="relative mx-auto overflow-x-hidden">
      <GridGradientBg className="from-blue-300" />
      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4">
        <div className="rounded-lg shadow-2xl shadow-gray-300">
          <div className="flex h-fit w-full flex-col gap-6 rounded-lg border border-stone-200 bg-gradient-to-t from-stone-50 to-white/20 p-4 shadow-inner shadow-white backdrop-blur-sm sm:p-8 md:p-12">
            {display}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
