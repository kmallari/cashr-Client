import React, { type FC } from "react";

import SignUpForm from "@/modules/auth/signup";
import GridGradientBg from "@/modules/common/gridGradientBg";

const SignUp: FC = () => {
  return (
    <main className="relative mx-auto overflow-x-hidden">
      <GridGradientBg />
      <SignUpForm />
    </main>
  );
};

export default SignUp;
