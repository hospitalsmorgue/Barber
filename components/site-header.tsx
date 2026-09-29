"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Scissors, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [{ href: "/busca", label: "Explorar" }, { href: "/ranking/sao-paulo", label: "Top 10" }, { href: "/hall-da-fama", label: "Hall da Fama" }, { href: "/cliente", label: "Minha área" }, { href: "/como-funciona", label: "Como funciona" }];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="site-header__inner">
      <Link className="brand" href="/" aria-label="Show de Barber, início"><span className="brand__icon"><Scissors size={19} /></span><span>SHOW DE <b>BARBER</b><i>ESTILO QUE DEIXA MARCA</i></span></Link>
      <button className="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      <nav className={cn("main-nav", open && "main-nav--open")}>
        {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={cn("main-nav__link", pathname === link.href && "is-active")}>{link.label}</Link>)}
        <Link href="/dashboard" className="main-nav__business">Sou barbearia <span>↗</span></Link>
        <Link href="/login" onClick={() => setOpen(false)}><Button size="sm" className="nav-login">Entrar <span>↗</span></Button></Link>
      </nav>
    </div>
  </header>;
}
