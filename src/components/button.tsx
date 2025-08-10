// components/Button.tsx
"use client";

import React, { ReactNode } from "react";

type ButtonProps = {
  children: string | ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; // optional extra class names
};

export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md font-semibold
        bg-blue-600 text-white
        hover:bg-blue-700
        disabled:bg-gray-400 disabled:cursor-not-allowed
        transition-colors
        ${className}
      `}
    >
      {children}
    </button>
  );
}
