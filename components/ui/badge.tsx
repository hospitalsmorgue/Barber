import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function HonourBadge({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return <span className={cn("honour-badge", compact && "honour-badge--compact", className)}><Award size={compact ? 13 : 15} strokeWidth={1.8} /><span>{compact ? "HONOUR" : "BADGE OF HONOUR"}</span></span>;
}

export function VerifiedMark({ className = "" }: { className?: string }) {
  return <span className={cn("verified-mark", className)} aria-label="Barbearia verificada">✓</span>;
}
