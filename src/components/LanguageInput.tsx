"use client";
import { FC, useState } from "react";
import Button from "./button";
import Label from "./label";

interface LanguageInputProps {
  categoryName: string;
  languages: string[];
  onLanguagesChange: (newLanguages: string[]) => void;
}

const LanguageInput: FC<LanguageInputProps> = ({
  categoryName,
  languages,
  onLanguagesChange,
}) => {
  const [newLanguage, setNewLanguage] = useState("");

  const handleAddLanguage = () => {
    if (newLanguage.trim() !== "" && !languages.includes(newLanguage.trim())) {
      onLanguagesChange([...languages, newLanguage.trim()]);
      setNewLanguage("");
    }
  };

  const handleDeleteLanguage = (langToDelete: string) => {
    onLanguagesChange(languages.filter((lang) => lang !== langToDelete));
  };

  return (
    <div>
      <Label className="!text-black font-semibold">
        {categoryName} Languages:
      </Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {languages.map((lang) => (
          <div
            key={lang}
            className="flex items-center bg-gray-200 rounded-full px-3 py-1"
          >
            <span>{lang}</span>
            <button
              type="button"
              onClick={() => handleDeleteLanguage(lang)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <Button type="button" onClick={handleAddLanguage}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default LanguageInput;
