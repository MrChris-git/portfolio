import { projectProps } from "@/types/project";

export const updateProject = async (index: number, project: projectProps) => {
  const res = await fetch("/api/projects", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, project }),
  });
  if (!res.ok) {
    throw new Error("Update failed");
  }
  return res.json();
};

export const addProject = async (project: projectProps) => {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!res.ok) {
    throw new Error("Add failed");
  }
  return res.json();
};
