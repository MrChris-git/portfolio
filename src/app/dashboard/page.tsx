"use client";
import React, { useEffect, useMemo, useState } from "react";
import Label from "@/components/label";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Modal, { ModalProps } from "@/components/modal";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  position: string[];
  programLang: Record<string, string[]>;
  demoUri?: string;
  score?: number | string;
};

type Education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  startDate: Date;
  endDate: Date;
  iconUri?: string;
  certUri?: string;
  activitiesAndSocieties?: string;
  description?: string;
};

const Dashboard = () => {
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const router = useRouter();
  const [auth, setAuth] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("pdf");

  const [editingData, setEditingData] = useState<ModalProps | null>(null);

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/auth/me");
      const meData = me.ok ? await me.json() : { authenticated: false };
      setAuth(!!meData.authenticated);
      const resP = await fetch("/api/projects");
      if (resP.ok) setProjects(await resP.json());
      const resE = await fetch("/api/educations");
      if (resE.ok) setEducations(await resE.json());
    })();
  }, [show]);

  const addProject = async (project: Project) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (res.ok) {
      setProjects((prev) => [...prev, project]);
    }
  };

  const deleteProject = async (index: number) => {
    const res = await fetch(`/api/projects?index=${index}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addEducation = async (education: Education) => {
    const res = await fetch("/api/educations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(education),
    });
    if (res.ok) {
      setEducations((prev) => [...prev, education]);
    }
  };

  const updateEducation = async (index: number, education: Education) => {
    const res = await fetch("/api/educations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, education }),
    });
    if (res.ok) {
      setEducations((prev) =>
        prev.map((e, i) => (i === index ? education : e))
      );
    }
  };

  const deleteEducation = async (index: number) => {
    const res = await fetch(`/api/educations?index=${index}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setEducations((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    fd.set("folder", folder);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: fd,
    });
    if (res.ok) {
      const data = await res.json();
      alert(`Uploaded to ${data.uri}`);
      // If a PDF was uploaded, persist its public path into pdf.json
      const uri = String(data.uri || "");
      if (uri && folder === "pdf") {
        await fetch("/api/pdf", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeUri: uri }),
        });
      }
      setFile(null);
    }
  };

  if (auth === false) {
    redirect("/dashboard/login");
  }
  if (auth === null) {
    return (
      <div className="p-4">
        <Label>Checking session...</Label>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          <Label>Dashboard</Label>
        </h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/dashboard/login";
          }}
        >
          <button className="border rounded px-3 py-1 dark:border-white">
            <Label>Logout</Label>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
          <h3 className="font-semibold mb-2">
            <Label>Projects</Label>
          </h3>
          <ul className="mb-3">
            {projects.map((p, i) => (
              <li
                key={`${p.title}-${i}`}
                className="flex justify-between border-b py-1 dark:border-white"
              >
                <span>
                  <Label>{p.title}</Label>
                </span>
                <div className="flex gap-2">
                  <button
                    className="border rounded px-2 dark:border-white"
                    onClick={() => {
                      setEditingData({
                        index: i,
                        editingData: p,
                        type: "project",
                      });
                      router.push("?show=true");
                    }}
                  >
                    <Label>Edit</Label>
                  </button>
                  <button
                    className="border rounded px-2 dark:border-white"
                    onClick={() => deleteProject(i)}
                  >
                    <Label>Delete</Label>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="border rounded px-3 py-1 dark:border-white"
            onClick={() => {
              const title = prompt("Title");
              if (!title) return;
              addProject({
                title,
                description: "",
                position: [],
                programLang: {},
              });
            }}
          >
            <Label>Add Project</Label>
          </button>
        </section>

        <section>
          <h3 className="font-semibold mb-2">
            <Label>Educations</Label>
          </h3>
          <ul className="mb-3">
            {educations.map((e, i) => (
              <li
                key={`${e.school}-${i}`}
                className="flex justify-between border-b py-1 dark:border-white"
              >
                <span>
                  <Label>{e.school}</Label>
                </span>
                <div className="flex gap-2">
                  <button
                    className="border rounded px-2 dark:border-white"
                    onClick={() => {
                      setEditingData({
                        index: i,
                        editingData: e,
                        type: "education",
                      });
                      console.log(e);
                      router.push("?show=true");
                    }}
                  >
                    <Label>Edit</Label>
                  </button>
                  <button
                    className="border rounded px-2 dark:border-white"
                    onClick={() => deleteEducation(i)}
                  >
                    <Label>Delete</Label>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            className="border rounded px-3 py-1 dark:border-white"
            onClick={() => {
              setEditingData({
                editingData: {
                  school: "",
                  degree: "",
                  fieldOfStudy: "",
                  grade: "",
                  startDate: new Date(),
                  endDate: new Date(),
                },
                type: "school",
              });
              router.push("?show=true");
            }}
          >
            <Label>Add Education</Label>
          </button>
        </section>

        <section className="md:col-span-2">
          <h3 className="font-semibold mb-2">
            <Label>Upload Resume Files</Label>
          </h3>
          <div className="flex gap-2 items-center">
            <select
              className="border rounded p-1 text-black dark:text-white dark:border-white"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="json">JSON</option>
            </select>
            <input
              className="border rounded p-1 dark:text-white dark:border-white"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              className="border rounded px-3 py-1 dark:border-white"
              onClick={uploadFile}
            >
              <Label>Upload</Label>
            </button>
          </div>
        </section>
      </div>
      {show && <Modal {...editingData} />}
    </div>
  );
};

export default Dashboard;
