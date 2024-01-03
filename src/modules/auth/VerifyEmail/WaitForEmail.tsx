"use client";

import React, { FC } from "react";
import { sendVerificationEmail } from "supertokens-auth-react/recipe/emailverification";

import { Button } from "@/components/ui/button";

import BackToLogin from "../common/BackToLogin";

const waitForEmail: FC = () => {
  return (
    <div className="mx-auto flex h-screen max-w-[520px] flex-col items-center justify-center gap-4 px-4">
      <div className="w-full space-y-7 rounded-md ">
        <div className="flex flex-col gap-4">
          <BackToLogin />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">Verification email sent!</h1>
            <p className="text-sm text-stone-500">
              Please check your inbox and click on the link to verify your email
              address.
            </p>
          </div>
        </div>
        <Button
          onClick={async () => {
            await sendVerificationEmail();
          }}
          className="text-sm"
        >
          Resend verification
        </Button>
      </div>
    </div>
  );
};

export default waitForEmail;
