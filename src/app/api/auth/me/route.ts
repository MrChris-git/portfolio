import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, verifyToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token) return NextResponse.json({ authenticated: false });
  const payload = verifyToken(token);
  return NextResponse.json({ authenticated: !!payload });
}
