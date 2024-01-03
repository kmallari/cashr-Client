import { cache } from "react";

import { sessionInfoApiRes, userInfoApiRes } from "@/modules/auth/types";

import http from "../../../lib/api/http.service";

const getUser = cache(async () => {
  return await http.get("/userinfo", userInfoApiRes);
});

const getSessionInfo = cache(async () => {
  await http.get("/sessioninfo", sessionInfoApiRes);
});

export { getUser, getSessionInfo };
