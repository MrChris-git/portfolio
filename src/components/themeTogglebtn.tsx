"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function themeTogglebtn() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.removeAttribute("data-theme");
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
  }, [dark]);

  return (
    <button
      className="flex p-2 items-center border border-gray-500 rounded-xl"
      onClick={() => setDark(!dark)}
    >
      {dark ? <Moon color="black" /> : <Sun color="white" />}
    </button>
  );
}
