"use client";

import { useEffect, useState } from "react";
import type { Barber } from "@/lib/barbers";
import { isOpenNow } from "@/lib/opening-hours";

export function useOpenStatus(barber: Barber) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setOpen(isOpenNow(barber));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [barber]);
  return open;
}
