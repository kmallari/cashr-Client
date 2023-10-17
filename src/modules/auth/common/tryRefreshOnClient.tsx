"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SuperTokens from "supertokens-auth-react";
import SessionReact from "supertokens-auth-react/recipe/session";

export const TryRefreshOnClient = () => {
  const router = useRouter();
  useEffect(() => {
    void SessionReact.attemptRefreshingSession()
      .then((hasSession) => {
        if (hasSession) {
          router.refresh();
        } else {
          return SuperTokens.redirectToAuth();
        }
      })
      .catch(console.error);
  }, []);

  return <div>Loading...</div>;
};
