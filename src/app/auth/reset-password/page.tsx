"use client";

import React, { type FC } from "react";
import { getResetPasswordTokenFromURL } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import AuthFormContainer from "@/modules/auth/common/AuthFormContainer";
import BackToLogin from "@/modules/auth/common/BackToLogin";
import ResetPasswordForm from "@/modules/auth/ResetPassword";
import SendResetPasswordEmailForm from "@/modules/auth/ResetPassword/SendEmailForm";
import GridGradientBg from "@/modules/common/GridGradientBg";

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
      <GridGradientBg className="from-blue-300 dark:from-blue-300/20" />
      <AuthFormContainer>{display}</AuthFormContainer>
    </main>
  );
};

export default ForgotPassword;
