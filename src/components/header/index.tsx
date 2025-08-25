import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Moon, PieChartIcon, Sun, Table } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  currentView: "table" | "charts";
  onViewChange: (view: "table" | "charts") => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold">
            P
          </span>
          <h1 className="text-xl font-bold">Patient App</h1>
        </div>

        <nav className="flex items-center gap-4">
          <Button
            variant={currentView === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("table")}
            className="flex items-center gap-2"
          >
            <Table className="h-4 w-4" />
            Table
          </Button>
          <Button
            variant={currentView === "charts" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("charts")}
            className="flex items-center gap-2"
          >
            <PieChartIcon className="h-4 w-4" />
            Charts
          </Button>
        </nav>

        <div>
          <Toggle
            pressed={isDark}
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            variant="outline"
          >
            {isDark ? (
              <Sun className="h-8 w-8" />
            ) : (
              <Moon className="h-8 w-8" />
            )}
          </Toggle>
        </div>
      </div>
    </header>
  );
}
