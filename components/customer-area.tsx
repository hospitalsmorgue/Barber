"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Heart, Star } from "lucide-react";
import { BarberCard } from "@/components/barber-card";
import { barbers } from "@/lib/barbers";
import { FAVORITES_EVENT, FAVORITES_KEY, readFavorites, writeFavorites } from "@/components/use-favorite";
import { Button } from "@/components/ui/button";

export function CustomerArea() {
  const [favoriteSlugs, setFavoriteSlugs] = useState(["casa-otavio", "dom-rafael"]);
  const [tab, setTab] = useState<"favorites" | "history">("favorites");
  const favorites = barbers.filter((barber) => favoriteSlugs.includes(barber.slug));
  useEffect(() => {
    if (localStorage.getItem(FAVORITES_KEY) === null) writeFavorites(favoriteSlugs);
    else setFavoriteSlugs(readFavorites());
    const sync = () => setFavoriteSlugs(readFavorites());
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(FAVORITES_EVENT, sync); window.removeEventListener("storage", sync); };
  }, []);
  const toggleFavorite = (slug: string) => {
    const next = favoriteSlugs.includes(slug) ? favoriteSlugs.filter((item) => item !== slug) : [...favoriteSlugs, slug];
    setFavoriteSlugs(next);
    writeFavorites(next);
  };
  return <div className="page-shell inner-page"><div className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow__line" /> SUA ÁREA</span><h1 className="page-title">Bom dia, Rafael.</h1><p className="profile-about">Seu estilo, seus lugares, suas escolhas.</p></div><Link href="/busca"><Button variant="outline">Encontrar barbearias <ArrowUpRight size={15} /></Button></Link></div><div className="customer-tabs"><button className={tab === "favorites" ? "active" : ""} onClick={() => setTab("favorites")}><Heart size={14} /> Favoritos <span>{favorites.length}</span></button><button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}><CalendarDays size={14} /> Meu histórico <span>3</span></button></div>{tab === "favorites" ? <><div className="section-heading"><div><h2>Seus lugares.</h2><p className="profile-about">Barbearias guardadas para o próximo corte.</p></div></div>{favorites.length ? <div className="barber-grid">{favorites.map((barber) => <div key={barber.slug}><BarberCard barber={barber} /><button className="remove-favorite" onClick={() => toggleFavorite(barber.slug)}><Heart size={13} /> Remover dos favoritos</button></div>)}</div> : <div className="empty-state"><Heart /><b>Seus favoritos aparecem por aqui.</b><Link href="/busca" className="text-link">Explorar barbearias</Link></div>}<div className="recommendation-block"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow__line" /> ESCOLHAS QUE COMBINAM COM VOCÊ</span><h2>Talvez você curta.</h2></div></div><div className="barber-grid">{barbers.filter((barber) => !favoriteSlugs.includes(barber.slug) && barber.specialties.includes("Fade")).slice(0, 3).map((barber) => <BarberCard key={barber.slug} barber={barber} />)}</div></div></> : <section className="history-list"><h2>Seus últimos cortes.</h2>{[{ name: "Casa Otávio", when: "12 set 2026", score: "10,0", comment: "Atendimento impecável. Voltarei!", slug: "casa-otavio" }, { name: "Dom Rafael", when: "28 ago 2026", score: "9,5", comment: "Corte excelente, ambiente muito bom.", slug: "dom-rafael" }, { name: "Navalha & Cia.", when: "03 ago 2026", score: "9,0", comment: "Ótimo fade e papo melhor ainda.", slug: "barbearia-navalha" }].map((review) => <article className="history-item" key={review.name}><span className="history-item__icon"><CalendarDays size={15} /></span><div><Link href={`/barbearia/${review.slug}`}><b>{review.name}</b></Link><small>{review.when}</small><p>{review.comment}</p></div><span className="review-score">{review.score} <Star size={12} fill="currentColor" /></span></article>)}</section>}</div>;
}
