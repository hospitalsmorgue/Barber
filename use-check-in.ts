"use client";

import { useEffect, useState } from "react";

const CHECKINS_KEY = "show-de-barber:check-ins";
export const CHECKINS_EVENT = "show-de-barber:check-ins-changed";
export type CheckInRecord = { slug: string; date: string };

export function readCheckIns(): CheckInRecord[] {
  try { return JSON.parse(window.localStorage.getItem(CHECKINS_KEY) ?? "[]") as CheckInRecord[]; }
  catch { return []; }
}

export function useCheckIn(slug: string) {
  const [checkedIn, setCheckedIn] = useState(false);
  useEffect(() => {
    const sync = () => setCheckedIn(readCheckIns().some((record) => record.slug === slug));
    sync();
    window.addEventListener(CHECKINS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(CHECKINS_EVENT, sync); window.removeEventListener("storage", sync); };
  }, [slug]);
  const checkIn = () => {
    const records = readCheckIns().filter((record) => record.slug !== slug);
    records.unshift({ slug, date: new Date().toISOString() });
    window.localStorage.setItem(CHECKINS_KEY, JSON.stringify(records));
    window.dispatchEvent(new Event(CHECKINS_EVENT));
    setCheckedIn(true);
  };
  return { checkedIn, checkIn };
}
