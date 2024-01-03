"use client";

import { LogOutIcon } from "lucide-react";
import React, { type FC } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import ThirdPartyEmailPassword from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { Button } from "@/components/ui/button";

const LogoutButton: FC = () => {
  const logoutClicked = async () => {
    await ThirdPartyEmailPassword.signOut();
    redirectToAuth();
  };

  return (
    <Button className="h-8 w-8 p-0" variant="outline" onClick={logoutClicked}>
      <LogOutIcon height={16} />
    </Button>
  );
};
export default LogoutButton;
