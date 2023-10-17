"use client";

import { useRouter } from "next/navigation";
import React, { type FC, useEffect } from "react";
import { thirdPartySignInAndUp } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

const SocialCallbackHandler: FC = () => {
  const router = useRouter();
  const handleGoogleCallback = async () => {
    try {
      console.log("1!");
      const response = await thirdPartySignInAndUp();
      console.log(response);
      if (response.status === "OK") {
        console.log("2!");
        console.log(response.user);
        if (
          response.createdNewRecipeUser &&
          response.user.loginMethods.length === 1
        ) {
          console.log("3!");
          return router.replace("/dashboard");
        } else {
          console.log("4!");
          return router.replace("/dashboard");
        }
      } else if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
        console.log("5!");
        // this can happen due to automatic account linking. Please see our account linking docs
      } else {
        console.log("6!");
        // SuperTokens requires that the third party provider
        // gives an email for the user. If that's not the case, sign up / in
        // will fail.

        // As a hack to solve this, you can override the backend functions to create a fake email for the user.

        console.error(
          "No email provided by social login. Please use another form of login",
        );
        router.push("/auth/login"); // redirect back to login page
      }
    } catch (err: any) {
      console.log("7!");
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        console.error(err.message);
      } else {
        console.log(err);
        console.error("Oops! Something went wrong.");
      }
    }
  };

  useEffect(() => {
    handleGoogleCallback();
  }, []);

  return <></>;
};

export default SocialCallbackHandler;
