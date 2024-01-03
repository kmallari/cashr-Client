import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("x-user-id");
  return NextResponse.json({
    userId,
  });
}
