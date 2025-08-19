import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthCookieName, verifyToken } from "@/utils/auth";

export const runtime = "nodejs";

const uploadRoot = path.join(process.cwd(), "public", "asset");

export async function POST(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = String(formData.get("folder") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const safeFolder = ["pdf", "video", "image", "json"].includes(folder)
    ? folder
    : "pdf";
  const targetDir = path.join(uploadRoot, safeFolder);
  fs.mkdirSync(targetDir, { recursive: true });

  const filePath = path.join(targetDir, file.name);
  fs.writeFileSync(filePath, buffer);

  const publicPath = `/asset/${safeFolder}/${file.name}`;
  return NextResponse.json({ ok: true, uri: publicPath });
}
