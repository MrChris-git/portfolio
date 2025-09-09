"use client";
import Link from "next/link";
import React, { FC } from "react";
import Button from "./button";
import { projectProps } from "@/types/project";
import { educationProps } from "@/types/education";
import ProjectEditForm from "./ProjectEditForm";
import EducationEditForm from "./EducationEditForm";
import { X } from "lucide-react";

export type ModalProps = {
  index?: number;
  editingData?: projectProps | educationProps;
  type?: string;
};

const Modal: FC<ModalProps> = ({ index, editingData, type }) => {
  let content: React.ReactNode = null;

  if (editingData) {
    if ("title" in editingData && type === "project") {
      content = <ProjectEditForm index={index} editingData={editingData} />;
    } else if (
      "school" in editingData &&
      (type === "school" || type === "education")
    ) {
      content = <EducationEditForm index={index} editingData={editingData} />;
    }
  }

  return (
    <div className="fixed top-0 inset-0 bg-black/90 overflow-y-auto h-full w-full flex items-center justify-center z-60">
      <div className="p-8 border max-h-10/12 w-3/4 shadow-lg rounded-md bg-white overflow-auto">
        <div className="px-4 flex justify-between items-start">
          <h3 className="text-2xl font-bold text-gray-900">
            {index !== undefined ? "Edit " : "Add "}
            {editingData
              ? "title" in editingData
                ? "Project"
                : "Education"
              : "Item"}{" "}
            {index}
          </h3>
          <Link href="/dashboard">
            <X />
          </Link>
        </div>
        <div className="mt-4 px-4 py-2">
          {content || <p>No data provided.</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
