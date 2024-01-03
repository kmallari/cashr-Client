"use client";

import { useRouter } from "next/navigation";
import React, { type FC } from "react";

const NoSession: FC = () => {
  const { push } = useRouter();
  push("/auth/signup");
  return <></>;
};
export default NoSession;
