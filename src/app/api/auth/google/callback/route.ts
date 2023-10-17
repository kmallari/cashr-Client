import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import api from "@/lib/api";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  console.time("google");
  const result = await api.post(`http://localhost:8080/auth/google`, { code });
  const { access_token: accessToken, refresh_token: refreshToken } =
    result.data as {
      access_token: string;
      refresh_token: string;
    };

  const fifteenMinutes = 60 * 15 * 1000;
  cookies().set("access_token", accessToken, {
    expires: Date.now() + fifteenMinutes,
    httpOnly: true,
  });

  const oneWeek = 24 * 7 * 60 * 60 * 1000;
  cookies().set("refresh_token", refreshToken, {
    expires: Date.now() + oneWeek,
    httpOnly: true,
  });

  return NextResponse.json({
    accessToken,
    refreshToken,
  });
}
