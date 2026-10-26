"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

type Theme = "paper" | "dusk";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dusk" ? "dusk" : "paper";
}

function getServerSnapshot(): Theme {
  return "paper";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", theme === "dusk" ? "#141311" : "#f4efe6");
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    const stored = localStorage.getItem("vesper-theme");
    if (stored === "dusk" || stored === "paper") applyTheme(stored);
  }, []);

  const toggle = () => {
    const current = document.documentElement.dataset.theme === "dusk" ? "dusk" : "paper";
    const next: Theme = current === "dusk" ? "paper" : "dusk";
    localStorage.setItem("vesper-theme", next);
    applyTheme(next);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggle}
      aria-pressed={theme === "dusk"}
      className="h-8 rounded-full border-border bg-transparent px-3 text-[0.8rem] font-normal tracking-[0.14em] text-muted-foreground shadow-none hover:bg-foreground hover:text-background"
    >
      {theme === "dusk" ? "纸色" : "夜读"}
    </Button>
  );
}
