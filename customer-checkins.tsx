"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, CalendarCheck, MapPin } from "lucide-react";
import { barbers } from "@/lib/barbers";
import { CHECKINS_EVENT, readCheckIns, type CheckInRecord } from "@/components/use-check-in";
import { useToast } from "@/components/toast-provider";
import { Button } from "@/components/ui/button";

export function CustomerCheckIns() {
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>([]);
  const notify = useToast();
  useEffect(() => {
    const sync = () => setCheckIns(readCheckIns());
    sync();
    window.addEventListener(CHECKINS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(CHECKINS_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  return <section className="customer-checkins page-shell"><div className="customer-checkins__heading"><div><span className="eyebrow"><span className="eyebrow__line" /> SUA PRESENÇA NA COMUNIDADE</span><h2>Check-ins recentes.</h2></div><Button variant="outline" size="sm" onClick={() => notify("Casa Otávio respondeu sua avaliação. Sua nota continua em 10,0.", "info")}><Bell size={13} /> Testar notificação</Button></div>{checkIns.length ? <div className="checkin-list">{checkIns.map((record) => { const barber = barbers.find((item) => item.slug === record.slug); if (!barber) return null; return <article className="checkin-row" key={record.slug}><span><CalendarCheck size={16} /></span><div><Link href={`/barbearia/${barber.slug}`}><b>{barber.name}</b></Link><small><MapPin size={11} /> {barber.neighborhood}, {barber.city} · {new Date(record.date).toLocaleDateString("pt-BR")}</small></div><span className="checkin-verified">Visita confirmada</span></article>; })}</div> : <div className="checkin-empty"><CalendarCheck size={19} /><span>Seus check-ins aparecem aqui depois da visita.</span><Link href="/busca">Encontrar uma barbearia</Link></div>}</section>;
}
