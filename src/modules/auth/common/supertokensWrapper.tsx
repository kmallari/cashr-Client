"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { SuperTokensWrapper } from "supertokens-auth-react";
import SuperTokensReact from "supertokens-auth-react";

import {
  frontendAuthConfig,
  setRouter,
} from "@/config/auth/frontendAuthConfig";

if (typeof window !== "undefined") {
  SuperTokensReact.init(frontendAuthConfig());
}

const Providers: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

export default Providers;
