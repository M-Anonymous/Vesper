"use client";

import { useSyncExternalStore } from "react";
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

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "dusk" ? "paper" : "dusk";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("vesper-theme", next);
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", next === "dusk" ? "#141311" : "#f4efe6");
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
