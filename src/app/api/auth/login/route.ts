import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieName, signToken, verifyCredentials } from "@/utils/auth";

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const ok = await verifyCredentials(username, password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken(username);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAuthCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}


