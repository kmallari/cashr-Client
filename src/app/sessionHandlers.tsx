import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Session, { SessionContainer } from "supertokens-node/recipe/session";

import { ensureSuperTokensInit } from "@/config/backendAuthConfig";

ensureSuperTokensInit();

export async function getSSRSession(req?: NextRequest): Promise<{
  session: SessionContainer | undefined;
  hasToken: boolean;
  resp?: Response;
}> {
  let token;
  if (req?.cookies) {
    token = req.cookies.get("sAccessToken")?.value;
  } else {
    token = cookies().get("sAccessToken")?.value;
  }

  if (token === undefined) {
    return {
      session: undefined,
      hasToken: false,
      resp: new NextResponse("Authentication required", { status: 401 }),
    };
  }

  let session;
  let resp;

  try {
    session = await Session.getSessionWithoutRequestResponse(token, undefined, {
      sessionRequired: false,
    });
  } catch (err) {
    if (Session.Error.isErrorFromSuperTokens(err)) {
      resp = new NextResponse("Authentication required", {
        status: err.type === Session.Error.INVALID_CLAIMS ? 403 : 401,
      });
    } else {
      throw err;
    }
  }

  return {
    session,
    hasToken: true,
    resp,
  };
}

export function updateSessionInResponse(
  session: SessionContainer,
  response?: NextResponse,
) {
  let tokens = session.getAllSessionTokensDangerously();
  if (tokens.accessAndFrontTokenUpdated) {
    const accessTokenCookie = {
      name: "sAccessToken",
      value: tokens.accessToken,
      httpOnly: true,
      path: "/",
      expires: Date.now() + 3153600000000,
    };

    if (response) {
      response.cookies.set(accessTokenCookie);
      response.headers.set("front-token", tokens.frontToken);
    } else {
      cookies().set(accessTokenCookie);
      headers().set("front-token", tokens.frontToken);
    }
  }
}

export async function withSession(
  request: NextRequest,
  handler: (session: SessionContainer | undefined) => Promise<NextResponse>,
) {
  let { session, resp: stResponse } = await getSSRSession(request);
  if (stResponse) {
    return stResponse;
  }
  let userResponse = await handler(session);

  if (session) {
    updateSessionInResponse(session, userResponse);
  }
  return userResponse;
}
