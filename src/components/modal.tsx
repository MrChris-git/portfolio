"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import Button from "./button";
import Label from "./label";
import { projectProps } from "@/types/project";
import { educationProps } from "@/types/education";
import { useRouter } from "next/navigation";
import Card from "./card";

export type ModalProps = {
  index?: number;
  editingData?: projectProps | educationProps;
  type?: string;
};

const Modal: FC<ModalProps> = ({ index, editingData, type }) => {
  const router = useRouter();
  let content: React.ReactNode = null;
  const [project, setProject] = useState<projectProps | null>(null);
  const [education, setEducation] = useState<educationProps | null>(null);

  const updateProject = async (index: number, project: projectProps) => {
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index, project }),
    });
    if (res.ok) {
      router.push("/dashboard");
      return;
    }
    alert("Update Fail");
  };

  if (editingData) {
    if ("title" in editingData && type === "project") {
      // ✅ It's a project
      content = (
        <form
          className="space-y-2 text-left"
          onSubmit={async (e) => {
            e.preventDefault();
            if (index && project) {
              updateProject(index, project);
              console.log("Submitting project:", project);
            }
          }}
        >
          <Label className="font-semibold">Project Title:</Label>
          <input
            id="title"
            aria-labelledby="title-label"
            className="border rounded px-2 py-1 w-full"
            type="text"
            value={project?.title ?? editingData.title}
            onChange={(e) =>
              setProject((prev) => ({
                ...(prev ?? editingData),
                title: e.target.value,
              }))
            }
            required
          />

          <Label className="font-semibold">Description:</Label>
          <textarea
            id="description"
            className="border rounded px-2 py-1 w-full"
            value={project?.description ?? editingData.description}
            onChange={(e) =>
              setProject((prev) => ({
                ...(prev ?? editingData),
                description: e.target.value,
              }))
            }
          />

          <Label className="font-semibold">Languages (comma separated):</Label>
          <input
            id="languages"
            className="border rounded px-2 py-1 w-full"
            type="text"
            value={
              project
                ? Object.values(project.programLang).flat().join(", ")
                : Object.values(editingData.programLang).flat().join(", ")
            }
            onChange={(e) => {
              // For simplicity, put all languages in a single array under "main"
              const langs = e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter((s): s is string => !!s);
              setProject((prev) => {
                const prevProject = prev ?? editingData;
                return {
                  ...prevProject,
                  programLang: {
                    ...prevProject.programLang,
                    main: langs,
                  },
                };
              });
            }}
          />

          <Label className="font-semibold">Position (comma separated):</Label>
          <input
            id="position"
            className="border rounded px-2 py-1 w-full"
            type="text"
            value={
              project
                ? project.position.join(", ")
                : editingData.position.join(", ")
            }
            onChange={(e) =>
              setProject((prev) => ({
                ...(prev ?? editingData),
                position: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
          />

          <Label className="font-semibold">Demo URL:</Label>
          <input
            id="demoUri"
            className="border rounded px-2 py-1 w-full"
            type="url"
            value={project?.demoUri ?? editingData.demoUri ?? ""}
            onChange={(e) =>
              setProject((prev) => ({
                ...(prev ?? editingData),
                demoUri: e.target.value,
              }))
            }
          />

          <div className="flex gap-2 mt-4">
            <Button type="submit">Save</Button>
            {/* You may want to add a cancel button here */}
          </div>
        </form>
      );
    } else if ("school" in editingData && type === "school") {
      // ✅ It's an education record
      content = (
        <div className="space-y-2 text-left">
          <Label className="font-semibold">School:</Label>
          <p>{editingData.school}</p>

          <Label className="font-semibold">Degree:</Label>
          <p>{editingData.degree}</p>

          <Label className="font-semibold">Field of Study:</Label>
          <p>{editingData.fieldOfStudy}</p>

          <Label className="font-semibold">Grade:</Label>
          <p>{editingData.grade}</p>

          <Label className="font-semibold">Duration:</Label>
          <p>
            {editingData.startDate.toString()} –{" "}
            {editingData.endDate.toString()}
          </p>

          {editingData.description && (
            <>
              <Label className="font-semibold">Description:</Label>
              <p>{editingData.description}</p>
            </>
          )}

          {editingData.certUri && (
            <>
              <Label className="font-semibold">Certificate:</Label>
              <a
                href={editingData.certUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {editingData.certUri}
              </a>
            </>
          )}
        </div>
      );
    }
  }

  return (
    <div className="fixed inset-0 bg-black/90 overflow-y-auto h-full w-full flex items-center justify-center z-60">
      <div className="p-8 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">
            Edit{" "}
            {editingData
              ? "title" in editingData
                ? "Project"
                : "Education"
              : "Item"}{" "}
            {index}
          </h3>
          <div className="mt-4 px-4 py-2">
            {content || <p>No data provided.</p>}
          </div>

          <Link href="/dashboard">
            <Button className="flex justify-center mt-6">Close</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
