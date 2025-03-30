"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
// import DownloadResume from "./downloadResume";

import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex gap-1 flex-col md:flex-row">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="rounded-xl"
      >
        {theme === "dark" ? <Moon className="" /> : <Sun className="" />}
      </Button>
    </div>
  );
}
