import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getAuthCookieName, verifyToken } from "@/utils/auth";
import { projectProps } from "@/types/project";

export const runtime = "nodejs";

const dataFile = path.join(
  process.cwd(),
  "public",
  "asset",
  "json",
  "projects.json"
);

function readProjects(): projectProps[] {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile, "utf8");
  try {
    return JSON.parse(raw) as projectProps[];
  } catch {
    return [];
  }
}

function writeProjects(projects: projectProps[]) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
  fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2) + "\n", "utf8");
}

function requireAuth(request: NextRequest): boolean {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token) return false;
  return verifyToken(token) != null;
}

export async function GET() {
  const projects = readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as projectProps;
  const projects = readProjects();
  projects.push(body);
  writeProjects(projects);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json()) as {
    index: number;
    project: projectProps;
  };
  const projects = readProjects();
  if (body.index < 0 || body.index >= projects.length) {
    return NextResponse.json({ error: "Index out of range" }, { status: 400 });
  }
  projects[body.index] = body.project;
  writeProjects(projects);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!requireAuth(request))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const index = Number(searchParams.get("index"));
  const projects = readProjects();
  if (!Number.isFinite(index) || index < 0 || index >= projects.length) {
    return NextResponse.json({ error: "Index out of range" }, { status: 400 });
  }
  projects.splice(index, 1);
  writeProjects(projects);
  return NextResponse.json({ ok: true });
}
