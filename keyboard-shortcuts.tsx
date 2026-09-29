"use client";

import { useEffect } from "react";
import { useToast } from "@/components/toast-provider";

export function KeyboardShortcuts() {
  const notify = useToast();
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable=true]")) return;
      if (event.key === "/") {
        const search = document.querySelector<HTMLInputElement>("#search-place, .filter-group input[type='text']");
        if (search) { event.preventDefault(); search.focus(); }
      }
      if (event.key === "?") notify("Atalhos: / foca a busca · Esc fecha menus e janelas.", "info");
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [notify]);
  return null;
}
