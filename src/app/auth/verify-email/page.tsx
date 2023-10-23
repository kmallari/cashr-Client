"use client";

import React, { useEffect, useState } from "react";
import { getEmailVerificationTokenFromURL } from "supertokens-auth-react/recipe/emailverification";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import NoSession from "@/modules/auth/verifyEmail/noSession";
import ValidateVerificationToken from "@/modules/auth/verifyEmail/validateVerificationToken";
import WaitForEmail from "@/modules/auth/verifyEmail/waitForEmail";
import FullScreenLoader from "@/modules/common/fullScreenLoader";

const VerifyEmailPage = () => {
  const session = useSessionContext();

  const [state, setState] = useState<
    "NO_SESSION" | "WITH_SESSION" | "VERIFY_TOKEN" | "LOADING"
  >("LOADING");

  useEffect(() => {
    if (!session.loading) {
      if (
        getEmailVerificationTokenFromURL() === "" &&
        !session.doesSessionExist
      ) {
        setState("NO_SESSION");
      } else if (
        getEmailVerificationTokenFromURL() === "" &&
        session.doesSessionExist
      ) {
        setState("WITH_SESSION");
      } else if (
        getEmailVerificationTokenFromURL() !== "" &&
        session.doesSessionExist
      ) {
        setState("VERIFY_TOKEN");
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.loading]);

  const displayed = {
    NO_SESSION: <NoSession />,
    WITH_SESSION: <WaitForEmail />,
    VERIFY_TOKEN: <ValidateVerificationToken />,
    LOADING: <FullScreenLoader />,
  };

  return displayed[state];
};

export default VerifyEmailPage;
