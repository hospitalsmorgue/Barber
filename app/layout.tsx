import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ToastProvider } from "@/components/toast-provider";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";

export const metadata: Metadata = {
  title: { default: "Show de Barber — Encontre seu próximo corte", template: "%s | Show de Barber" },
  description: "Encontre barbearias de confiança, veja trabalhos reais e escolha seu próximo corte com avaliações de verdade.",
  openGraph: { title: "Show de Barber", description: "Estilo que deixa marca.", locale: "pt_BR", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" /></head><body><ToastProvider><SiteHeader /><KeyboardShortcuts /><main>{children}</main><SiteFooter /></ToastProvider></body></html>;
}
