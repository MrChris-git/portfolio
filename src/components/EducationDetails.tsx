"use client";
import { FC } from "react";
import { educationProps } from "@/types/education";
import Label from "./label";

interface EducationDetailsProps {
  editingData: educationProps;
}

const EducationDetails: FC<EducationDetailsProps> = ({ editingData }) => {
  return (
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
        {editingData.startDate.toString()} – {editingData.endDate.toString()}
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
};

export default EducationDetails;
