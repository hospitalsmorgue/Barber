import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-gold text-ink hover:bg-[#e6c75d]",
      outline: "border border-white/15 bg-transparent text-white hover:border-gold/60 hover:text-gold",
      ghost: "text-white/70 hover:bg-white/5 hover:text-white",
      dark: "bg-white text-ink hover:bg-white/85",
      subtle: "bg-white/[0.06] text-white hover:bg-white/10"
    },
    size: { default: "h-11 px-5", sm: "h-9 px-3 text-xs", lg: "h-12 px-6", icon: "size-10" }
  },
  defaultVariants: { variant: "default", size: "default" }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
