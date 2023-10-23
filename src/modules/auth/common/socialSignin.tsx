import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { BsArrowRightShort, BsGithub, BsGoogle } from "react-icons/bs";
import {
  getAuthorisationURLWithQueryParamsAndSetState,
  thirdPartySignInAndUp,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { Button } from "@/components/ui/button";
const CLIENT_URL = process.env.NEXT_PUBLIC_CLIENT_DOMAIN;

type SocialSigninProps = {
  disabled?: boolean;
};

const SocialSignin: FC<SocialSigninProps> = ({ disabled }) => {
  const { push } = useRouter();

  const socialSignin = async (type: "github" | "google") => {
    const authUrl = await getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: type,
      frontendRedirectURI: `${CLIENT_URL}/auth/callback/${type}`,
    });
    push(authUrl);
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={(e) => {
          e.preventDefault();
          socialSignin("google");
        }}
        disabled={disabled}
        type="button"
        variant="outline"
        className="flex w-full flex-row items-center justify-between gap-4 hover:bg-stone-900 hover:text-stone-50"
      >
        <div className="flex items-center gap-3">
          <BsGoogle />
          Continue with Google
        </div>
        <BsArrowRightShort />
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          socialSignin("github");
        }}
        disabled={disabled}
        type="button"
        variant="outline"
        className="flex w-full flex-row items-center justify-between gap-4 hover:bg-stone-900 hover:text-stone-50"
      >
        <div className="flex items-center gap-3">
          <BsGithub />
          Continue with GitHub
        </div>
        <BsArrowRightShort />
      </Button>
    </div>
  );
};
export default SocialSignin;
