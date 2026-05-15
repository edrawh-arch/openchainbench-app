"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[100px] h-8 bg-transparent" />; // Placeholder
  }

  return (
    <div className="flex items-center gap-1 bg-[#F5F5F5] dark:bg-[#111] border border-[#E5E5E5] dark:border-[#333] rounded-full p-1">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
          theme === "light"
            ? "bg-white dark:bg-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[#111] dark:text-white"
            : "text-[#888] hover:text-[#111] dark:hover:text-white"
        }`}
        title="Light theme"
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
          theme === "dark"
            ? "bg-white dark:bg-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[#111] dark:text-white"
            : "text-[#888] hover:text-[#111] dark:hover:text-white"
        }`}
        title="Dark theme"
      >
        <Moon className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-colors flex items-center justify-center ${
          theme === "system"
            ? "bg-white dark:bg-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-[#111] dark:text-white"
            : "text-[#888] hover:text-[#111] dark:hover:text-white"
        }`}
        title="System theme"
      >
        <Laptop className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
