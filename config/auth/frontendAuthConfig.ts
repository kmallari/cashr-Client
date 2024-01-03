import { useRouter } from "next/navigation";
import supertokens from "supertokens-auth-react";
import EmailVerificationReact from "supertokens-auth-react/recipe/emailverification";
import SessionReact from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPasswordReact from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { appInfo } from "./appInfo";

const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =
  {};

export function setRouter(
  router: ReturnType<typeof useRouter>,
  pathName: string,
) {
  routerInfo.router = router;
  routerInfo.pathName = pathName;
}

export const frontendAuthConfig = (): Parameters<
  typeof supertokens.init
>[0] => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordReact.init({
        signInAndUpFeature: {
          providers: [
            ThirdPartyEmailPasswordReact.Google.init(),
            ThirdPartyEmailPasswordReact.Github.init(),
          ],
        },
      }),
      EmailVerificationReact.init({
        mode: "REQUIRED",
      }),
      SessionReact.init(),
    ],
    windowHandler: (orig) => ({
      ...orig,
      location: {
        ...orig.location,
        getPathName: () => routerInfo.pathName || "",
        assign: (url) => routerInfo.router?.push(url.toString()),
        setHref: (url) => routerInfo.router?.push(url.toString()),
      },
    }),
  };
};
