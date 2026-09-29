"use client";

import { useEffect, useState } from "react";

export const FAVORITES_KEY = "show-de-barber:favorites";
export const FAVORITES_EVENT = "show-de-barber:favorites-changed";

export function readFavorites() {
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function writeFavorites(favorites: string[]) {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function useFavorite(slug: string) {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const sync = () => setIsFavorite(readFavorites().includes(slug));
    sync();
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);
  const toggle = () => {
    const favorites = readFavorites();
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    writeFavorites(next);
    setIsFavorite(next.includes(slug));
  };
  return { isFavorite, toggle };
}
