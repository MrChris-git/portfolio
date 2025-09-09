import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthCookieName, verifyToken } from "@/utils/auth";

export const runtime = "nodejs";

const dataFile = path.join(
  process.cwd(),
  "public",
  "asset",
  "json",
  "pdf.json"
);

type PdfData = {
  resumeUri: string;
};

function readPdf(): PdfData | null {
  try {
    if (!fs.existsSync(dataFile)) return null;
    const raw = fs.readFileSync(dataFile, "utf8").trim();
    if (!raw) return null;
    return JSON.parse(raw) as PdfData;
  } catch {
    return null;
  }
}

function writePdf(data: PdfData) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export async function GET() {
  const data = readPdf();
  return NextResponse.json(data ?? { resumeUri: "" });
}

export async function PUT(request: NextRequest) {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Partial<PdfData>;
  const existing = readPdf() ?? { resumeUri: "" };
  const next: PdfData = {
    ...existing,
    ...body,
    resumeUri: body.resumeUri ?? existing.resumeUri,
  };
  writePdf(next);
  return NextResponse.json({ ok: true });
}
