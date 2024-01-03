import axios from "axios";
import { redirect } from "next/navigation";
import React, { type FC, PropsWithChildren } from "react";

import { getSessionInfo } from "../actions/user";

export enum Paths {
  Dashboard = "DASHBOARD",
  Auth = "AUTH",
}

const pathsRequiringAuth = [Paths.Dashboard];
const _pathsNotRequiringAuth = [Paths.Auth];

const findRedirectPath = async (
  requiresAuth: boolean,
): Promise<"NO_REDIRECT" | string> => {
  try {
    await getSessionInfo();
    if (requiresAuth) {
      return "NO_REDIRECT";
    } else {
      return "/dashboard";
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (requiresAuth) {
        return "/auth/login";
      } else {
        return "NO_REDIRECT";
      }
    } else {
      console.error("Unexpected error:", err);
      return "/";
    }
  }
};

type RouteGuardProps = {
  from: Paths;
};

const RouteGuard: FC<PropsWithChildren<RouteGuardProps>> = async ({
  from,
  children,
}) => {
  const requiresAuth = pathsRequiringAuth.includes(from);
  const redirectTo = await findRedirectPath(requiresAuth);

  if (redirectTo === "NO_REDIRECT") return <>{children}</>;
  redirect(redirectTo);
};

export default RouteGuard;
