"use client";

import { LineWobble } from "@uiball/loaders";
import { useRouter } from "next/navigation";
import React, { type FC, useEffect } from "react";
import { thirdPartySignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

const SocialCallbackHandler: FC = () => {
  const router = useRouter();

  const handleCallback = async () => {
    try {
      const response = await thirdPartySignInAndUp();
      if (response.status === "OK") {
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          return router.replace("/dashboard");
        } else {
          return router.replace("/dashboard");
        }
      } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
        // this can happen due to automatic account linking. Please see our account linking docs
      } else {
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.

        // As a hack to solve this, you can override the backend functions to create a fake email for the user.
        console.error(
          "No email provided by social login. Please use another form of login",
        );
        router.push("/auth/login"); // redirect back to login page
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error: ", err.message);
        //} else if (err.isSuperTokensGeneralError) {
        // this may be a custom error message sent from the API by you.
        //console.error(err.message);
      } else {
        console.error("Oops! An unexpected error occured.");
      }
    }
  };

  useEffect(() => {
    (async function cb() {
      await handleCallback();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <LineWobble />
    </main>
  );
};

export default SocialCallbackHandler;
