import z from "zod";

export const sessionInfoApiRes = z.object({
  accessTokenPayload: z.object({
    antiCsrfToken: z.string().nullable(),
    exp: z.number(),
    iat: z.number(),
    iss: z.string(),
    parentRefreshTokenHash1: z.string().nullable(),
    refreshTokenHash1: z.string(),
    sessionHandle: z.string(),
    "st-ev": z.object({ t: z.number(), v: z.boolean() }),
    sub: z.string(),
    tId: z.string(),
  }),
  sessionData: z.record(z.string(), z.string()),
  sessionHandle: z.string(),
  userId: z.string().length(36),
});

export const userInfoApiRes = z.object({
  email: z.string().email(),
  id: z.string().length(36),
  tenantIds: z.array(z.string()).nullable(),
  thirdParty: z.object({
    id: z.string(),
    userId: z.string(),
  }),
  timeJoined: z.number(),
});
