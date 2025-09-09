"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { educationProps } from "@/types/education";
import Button from "./button";
import Label from "./label";
import { addEducation, updateEducation } from "@/utils/educationApi";

interface EducationEditFormProps {
  index?: number;
  editingData: educationProps;
}

const EducationEditForm: FC<EducationEditFormProps> = ({
  index,
  editingData,
}) => {
  const router = useRouter();
  const [education, setEducation] = useState<educationProps>({
    ...editingData,
    startDate: new Date(editingData.startDate),
    endDate: new Date(editingData.endDate),
  });
  const [certFile, setCertFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(editingData);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (index !== undefined) {
        await updateEducation(index, education);
      } else {
        await addEducation(education);
      }
      router.push("/dashboard");
    } catch (error) {
      alert(index !== undefined ? "Update Fail" : "Add Fail");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setEducation((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEducation((prev) => ({ ...prev, [id]: new Date(value) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCertFile(file);
  };

  const handleFileUpload = async () => {
    if (!certFile) return;

    const formData = new FormData();
    formData.append("file", certFile);
    formData.append("folder", "pdf");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { uri } = await res.json();
        const filename = (uri as string).split("/").pop() || "";
        setEducation((prev) => ({ ...prev, certUri: filename }));
        alert("PDF uploaded successfully!");
        setCertFile(null);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Upload error");
    }
  };

  return (
    <form className="space-y-2 text-left" onSubmit={handleSubmit}>
      <Label id="school-label" className="font-semibold !text-black">
        School:
      </Label>
      <input
        id="school"
        type="text"
        value={education.school}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
        required
      />

      <Label id="degree-label" className="font-semibold !text-black">
        Degree:
      </Label>
      <input
        id="degree"
        type="text"
        value={education.degree}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="fieldOfStudy-label" className="font-semibold !text-black">
        Field of Study:
      </Label>
      <input
        id="fieldOfStudy"
        type="text"
        value={education.fieldOfStudy}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="grade-label" className="font-semibold !text-black">
        Grade:
      </Label>
      <input
        id="grade"
        type="text"
        value={education.grade}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="startDate-label" className="font-semibold !text-black">
        Start Date:
      </Label>
      <input
        id="startDate"
        type="date"
        value={education.startDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="endDate-label" className="font-semibold !text-black">
        End Date:
      </Label>
      <input
        id="endDate"
        type="date"
        value={education.endDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="description-label" className="font-semibold !text-black">
        Description:
      </Label>
      <textarea
        id="description"
        value={education.description || ""}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
      />

      <Label id="certUri-label" className="font-semibold !text-black">
        Certificate:
      </Label>
      <div className="flex gap-2">
        <input
          id="certUri"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="border rounded px-2 py-1 w-full"
        />
        <Button type="button" onClick={handleFileUpload} disabled={!certFile}>
          Upload PDF
        </Button>
      </div>
      {education.certUri && <p>Current certificate: {education.certUri}</p>}

      <div className="flex gap-2 mt-4">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default EducationEditForm;
