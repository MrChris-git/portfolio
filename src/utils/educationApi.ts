import { educationProps } from "@/types/education";

export const updateEducation = async (index: number, education: educationProps) => {
  const res = await fetch("/api/educations", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index, education }),
  });
  if (!res.ok) {
    throw new Error("Update failed");
  }
  return res.json();
};

export const addEducation = async (education: educationProps) => {
  const res = await fetch("/api/educations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(education),
  });
  if (!res.ok) {
    throw new Error("Add failed");
  }
  return res.json();
};
