import { NextResponse } from "next/server";

export const UnauthorizedNextResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
