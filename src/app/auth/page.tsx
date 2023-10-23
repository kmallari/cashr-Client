import { redirect } from "next/navigation";
import React from "react";

import { getSSRSession } from "@/app/sessionHandlers";

const AuthPage = async () => {
  const { session, hasToken } = await getSSRSession();

  if (!session && !hasToken) {
    redirect("/auth/login");
  } else if (!session && hasToken) {
    redirect("/auth/verify-email");
  } else if (session && hasToken) {
    redirect("/dashboard");
  }

  return <></>;
};

export default AuthPage;
