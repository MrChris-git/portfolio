import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthCookieName, verifyToken } from "@/utils/auth";
import { educationProps } from "@/types/education";

export const runtime = "nodejs";

const dataFile = path.join(
  process.cwd(),
  "public",
  "asset",
  "json",
  "educations.json"
);

function readEducations(): educationProps[] {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile, "utf8");
  try {
    const items = JSON.parse(raw) as Array<
      Omit<educationProps, "startDate" | "endDate"> & {
        startDate: string;
        endDate: string;
      }
    >;
    return items.map((e) => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: new Date(e.endDate),
    }));
  } catch {
    return [] as unknown as educationProps[];
  }
}

function writeEducations(educations: educationProps[]) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  const serializable = educations.map((e) => ({
    ...e,
    startDate:
      typeof e.startDate === "string" ? e.startDate : e.startDate.toISOString(),
    endDate:
      typeof e.endDate === "string" ? e.endDate : e.endDate.toISOString(),
  }));
  fs.writeFileSync(
    dataFile,
    JSON.stringify(serializable, null, 2) + "\n",
    "utf8"
  );
}

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token) return false;
  return verifyToken(token) != null;
}

export async function GET() {
  const educations = readEducations();
  return NextResponse.json(educations);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as educationProps;
  const items = readEducations();
  items.push(body);
  writeEducations(items);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as {
    index: number;
    education: educationProps;
  };
  const items = readEducations();
  if (body.index < 0 || body.index >= items.length) {
    return NextResponse.json({ error: "Index out of range" }, { status: 400 });
  }
  items[body.index] = body.education;
  writeEducations(items);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const index = Number(searchParams.get("index"));
  const items = readEducations();
  if (!Number.isFinite(index) || index < 0 || index >= items.length) {
    return NextResponse.json({ error: "Index out of range" }, { status: 400 });
  }
  items.splice(index, 1);
  writeEducations(items);
  return NextResponse.json({ ok: true });
}
