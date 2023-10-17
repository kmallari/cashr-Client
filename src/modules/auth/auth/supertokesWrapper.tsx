"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import { frontendAuthConfig, setRouter } from "@/config/frontendAuthConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendAuthConfig());
}

export const SupertokesWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
