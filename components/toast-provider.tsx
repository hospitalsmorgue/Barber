"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Check, Info, X } from "lucide-react";

type ToastKind = "success" | "info";
type ToastItem = { id: number; message: string; kind: ToastKind };
const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const notify = (message: string, kind: ToastKind = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, kind }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600);
  };
  return <ToastContext.Provider value={notify}>{children}<div className="toast-stack" aria-live="polite" aria-atomic="false">{toasts.map((toast) => <div className={`toast toast--${toast.kind}`} role="status" key={toast.id}>{toast.kind === "success" ? <Check size={15} /> : <Info size={15} />}<span>{toast.message}</span><button aria-label="Dispensar notificação" onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}><X size={14} /></button></div>)}</div></ToastContext.Provider>;
}

export function useToast() {
  return useContext(ToastContext);
}
