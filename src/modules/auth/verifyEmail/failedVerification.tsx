"use client";

import React, { type FC } from "react";
import { sendVerificationEmail } from "supertokens-auth-react/recipe/emailverification";

import { Button } from "@/components/ui/button";

import BackToLogin from "../common/backToLogin";

const FailedVerification: FC = () => {
  return (
    <div className="mx-auto flex h-screen max-w-[520px] flex-col items-center justify-center gap-4 px-4">
      <div className="w-full space-y-7 rounded-md ">
        <div className="flex flex-col gap-4">
          <BackToLogin />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium text-red-500">
              Oops! An unexpected error occurred.
            </h1>
            <p className="text-sm text-stone-500">
              There was error verifying your email address due to an invalid
              email verification token. Please make sure you are using the
              latest email verification link.
            </p>
          </div>
        </div>
        <Button
          onClick={async () => {
            const res = await sendVerificationEmail();
          }}
          className="text-sm"
        >
          Resend verification
        </Button>
      </div>
    </div>
  );
};

export default FailedVerification;
