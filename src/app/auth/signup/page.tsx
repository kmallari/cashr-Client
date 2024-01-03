import React, { type FC } from "react";

import SignUpForm from "@/modules/auth/SignUp";
import GridGradientBg from "@/modules/common/GridGradientBg";

const SignUp: FC = () => {
  return (
    <main className="relative mx-auto overflow-x-hidden">
      <GridGradientBg />
      <SignUpForm />
    </main>
  );
};

export default SignUp;
