import { redirect } from "next/navigation";
import React, { type FC, ReactNode } from "react";
import { RecipeUserId } from "supertokens-node";
import { isEmailVerified } from "supertokens-node/recipe/emailverification";

import { getSSRSession } from "@/app/sessionHandlers";

type SSRRouteGuardProps = {
  from: "AUTH" | "DASHBOARD";
  children?: ReactNode;
};

const SSRRouteGuard: FC<SSRRouteGuardProps> = async ({ children, from }) => {
  // const { session } = await getSSRSession();
  // if (session && from === "AUTH") {
  //   const isVerified = await isEmailVerified(
  //     new RecipeUserId(session?.getUserId()),
  //   );
  //   if (!isVerified) {
  //     redirect("/auth/verify-email");
  //   } else {
  //     redirect("/dashboard");
  //   }
  // } else if (!session && from === "DASHBOARD") {
  //   redirect("/auth/login");
  // }
  return <>{children}</>;
};

export default SSRRouteGuard;
