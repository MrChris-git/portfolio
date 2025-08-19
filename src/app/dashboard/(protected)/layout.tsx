import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthCookieName, verifyToken } from "@/utils/auth";
import React from "react";

export const runtime = "nodejs";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(getAuthCookieName())?.value;
  if (!token || !verifyToken(token)) {
    redirect("/dashboard/login");
  }
  return <>{children}</>;
}
