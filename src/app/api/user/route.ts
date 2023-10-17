import { NextRequest, NextResponse } from "next/server";

import { withSession } from "@/app/sessionHandlers";

export function GET(request: NextRequest) {
  return withSession(request, async (session) => {
    if (!session) {
      return new NextResponse("Authentication required", { status: 401 });
    }

    const payload = await session.getAccessTokenPayload();

    let count = payload.count;
    if (count === undefined) {
      count = 1;
    } else {
      count++;
    }

    await session.mergeIntoAccessTokenPayload({
      count,
    });

    return NextResponse.json({
      count,
    });
  });
}
