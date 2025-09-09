"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { projectProps } from "@/types/project";
import Button from "./button";
import Label from "./label";
import { addProject, updateProject } from "@/utils/projectApi";
import LanguageInput from "./LanguageInput";

interface ProjectEditFormProps {
  index?: number;
  editingData: projectProps;
}

const ProjectEditForm: FC<ProjectEditFormProps> = ({ index, editingData }) => {
  const router = useRouter();
  const [project, setProject] = useState<projectProps>(editingData);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleLanguageChange = (
    category: keyof typeof project.programLang,
    newLanguages: string[]
  ) => {
    setProject((prev) => ({
      ...prev,
      programLang: {
        ...prev.programLang,
        [category]: newLanguages,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("folder", "video");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { uri } = await res.json();
        const filename = uri.split("/").pop();
        setProject({ ...project, demoUri: filename });
        alert("Video uploaded successfully!");
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Upload error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (index !== undefined) {
        await updateProject(index, project);
      } else {
        await addProject(project);
      }
      router.push("/dashboard");
    } catch (error) {
      alert(index !== undefined ? "Update Fail" : "Add Fail");
      console.error(error);
    }
  };

  return (
    <form className="space-y-2 text-left" onSubmit={handleSubmit}>
      <Label id="title-label" className="!text-black font-semibold">
        Project Title:
      </Label>
      <input
        id="title"
        aria-labelledby="title-label"
        className="border rounded px-2 py-1 w-full"
        type="text"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
        required
      />

      <Label id="description-label" className="!text-black font-semibold">
        Description:
      </Label>
      <textarea
        id="description"
        aria-labelledby="description-label"
        className="border rounded px-2 py-1 w-full"
        value={project.description}
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      />

      <LanguageInput
        categoryName="Frontend"
        languages={project.programLang.frontend || []}
        onLanguagesChange={(langs) => handleLanguageChange("frontend", langs)}
      />

      <LanguageInput
        categoryName="Backend"
        languages={project.programLang.backend || []}
        onLanguagesChange={(langs) => handleLanguageChange("backend", langs)}
      />

      <LanguageInput
        categoryName="Database"
        languages={project.programLang.database || []}
        onLanguagesChange={(langs) => handleLanguageChange("database", langs)}
      />

      <LanguageInput
        categoryName="AI"
        languages={project.programLang.ai || []}
        onLanguagesChange={(langs) => handleLanguageChange("ai", langs)}
      />

      <LanguageInput
        categoryName="Server"
        languages={project.programLang.server || []}
        onLanguagesChange={(langs) => handleLanguageChange("server", langs)}
      />

      <Label id="position-label" className="!text-black font-semibold">
        Position (comma separated):
      </Label>
      <input
        id="position"
        aria-labelledby="position-label"
        className="border rounded px-2 py-1 w-full"
        type="text"
        value={project.position.join(", ")}
        onChange={(e) =>
          setProject({
            ...project,
            position: e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
      />

      <Label id="demoUri-label" className="!text-black font-semibold">
        Demo Video:
      </Label>
      <div className="flex gap-2">
        <input
          id="demoUri"
          aria-labelledby="demoUri-label"
          className="border rounded px-2 py-1 w-full"
          type="file"
          accept="video/mp4"
          onChange={handleFileChange}
        />
        <Button type="button" onClick={handleFileUpload} disabled={!videoFile}>
          Upload Video
        </Button>
      </div>
      {project.demoUri && <p>Current video: {project.demoUri}</p>}

      <div className="flex gap-2 mt-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default ProjectEditForm;
