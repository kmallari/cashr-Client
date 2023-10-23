import supertokens from "supertokens-node";
import EmailVerificationNode from "supertokens-node/recipe/emailverification";
import SessionNode from "supertokens-node/recipe/session";
import ThirdPartyEmailPasswordNode from "supertokens-node/recipe/thirdpartyemailpassword";
import { TypeInput } from "supertokens-node/types";

import { appInfo } from "./appInfo";

export const backendAuthConfig = (): TypeInput => {
  const connectionURI = process.env.SUPERTOKENS_DOMAIN;
  const supertokensApiKey = process.env.SUPERTOKENS_API_KEY;

  return {
    framework: "express",
    supertokens: {
      connectionURI,
      apiKey: supertokensApiKey,
    },
    appInfo,
    recipeList: [
      ThirdPartyEmailPasswordNode.init({
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId: process.env.GOOGLE_CLIENT_ID,
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                },
              ],
            },
          },
          {
            config: {
              thirdPartyId: "github",
              clients: [
                {
                  clientId: process.env.GITHUB_CLIENT_ID!,
                  clientSecret: process.env.GITHUB_CLIENT_SECRET,
                },
              ],
            },
          },
        ],
      }),
      EmailVerificationNode.init({
        mode: "REQUIRED",
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;

export function ensureSuperTokensInit() {
  if (!initialized) {
    supertokens.init(backendAuthConfig());
    initialized = true;
  }
}
