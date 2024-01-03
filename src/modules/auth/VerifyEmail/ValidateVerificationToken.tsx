"use client";

import React, { type FC, useEffect, useState } from "react";
import { verifyEmail } from "supertokens-auth-react/recipe/emailverification";

import FullScreenLoader from "@/modules/common/FullScreenLoader";

import FailedVerification from "./FailedVerification";
import SuccessfulVerification from "./SuccessfulVerification";

const ValidateVerificationToken: FC = () => {
  // 0 = loading, -1 = failed, 1 = success
  const [isSuccessful, setIsSuccessful] = useState<-1 | 0 | 1>(0);

  useEffect(() => {
    verifyEmail().then((res) => {
      if (res.status === "OK") {
        setIsSuccessful(1);
      } else {
        setIsSuccessful(-1);
      }
    });
  }, []);

  const display = {
    0: <FullScreenLoader />,
    1: <SuccessfulVerification />,
    "-1": <FailedVerification />,
  };

  return display[isSuccessful];
};

export default ValidateVerificationToken;
