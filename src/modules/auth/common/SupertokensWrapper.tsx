"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import {
  frontendAuthConfig,
  setRouter,
} from "@/config/auth/frontendAuthConfig";

if (typeof window !== "undefined") {
  SuperTokensReact.init(frontendAuthConfig());
}

const Providers = ({ children }: { children: ReactNode }) => {
  setRouter(useRouter(), usePathname() || window.location.pathname);

  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};

export default Providers;
