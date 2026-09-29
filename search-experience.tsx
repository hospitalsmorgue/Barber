"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Map, MapPin, Search, ShieldCheck, SlidersHorizontal, Scale } from "lucide-react";
import { BarberCard } from "@/components/barber-card";
import { BarberGridSkeleton } from "@/components/skeletons";
import { barbers, hasBadge } from "@/lib/barbers";
import { isOpenNow } from "@/lib/opening-hours";
import { Button } from "@/components/ui/button";

export function SearchExperience({ initialQuery = "", initialBadge = false }: { initialQuery?: string; initialBadge?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const [city, setCity] = useState("Todas as cidades");
  const [specialty, setSpecialty] = useState("Todas");
  const [rating, setRating] = useState("0");
  const [price, setPrice] = useState("250");
  const [distance, setDistance] = useState("10");
  const [badgeOnly, setBadgeOnly] = useState(initialBadge);
  const [openOnly, setOpenOnly] = useState(false);
  const [mapMode, setMapMode] = useState(false);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timeout);
  }, []);
  const filtered = useMemo(() => barbers.filter((barber) => {
    const text = `${barber.name} ${barber.neighborhood} ${barber.city} ${barber.specialties.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (city === "Todas as cidades" || barber.city === city) && (specialty === "Todas" || barber.specialties.includes(specialty)) && barber.rating >= Number(rating) && barber.price <= Number(price) && barber.distance <= Number(distance) && (!badgeOnly || hasBadge(barber)) && (!openOnly || isOpenNow(barber));
  }), [query, city, specialty, rating, price, distance, badgeOnly, openOnly]);
  const toggleCompare = (slug: string) => setSelectedSlugs((current) => current.includes(slug) ? current.filter((item) => item !== slug) : current.length < 3 ? [...current, slug] : current);
  return <div className="page-shell inner-page">
    <div className="page-topline"><Link href="/">Início</Link><span>/</span>Explorar barbearias</div>
    <div className="inner-page__intro"><span className="eyebrow"><span className="eyebrow__line" /> DO SEU BAIRRO AO SEU PRÓXIMO CORTE</span><h1 className="page-title">Encontre o seu lugar.</h1><p>Pesquise, compare e escolha com confiança. Cada nota vem de quem sentou na cadeira.</p></div>
    <div className="search-results__bar"><span>{filtered.length} barbearias encontradas</span><div className="search-results__actions"><button className={`filter-pill ${openOnly ? "is-active" : ""}`} aria-pressed={openOnly} onClick={() => setOpenOnly(!openOnly)}>Aberto agora</button><button className="filter-pill" onClick={() => setMapMode(!mapMode)}><Map size={14} /> {mapMode ? "Ver lista" : "Ver mapa"}</button></div></div>
    <div className="search-page-layout">
      <aside className="filter-panel"><h3><SlidersHorizontal size={15} /> Filtros</h3><div className="filter-row">
        <div className="filter-group"><h4>Buscar</h4><input type="text" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, bairro, cidade..." /></div>
        <div className="filter-group"><h4>Cidade</h4><select value={city} onChange={(event) => setCity(event.target.value)}><option>Todas as cidades</option>{Array.from(new Set(barbers.map((barber) => barber.city))).map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="filter-group"><h4>Especialidade</h4><select value={specialty} onChange={(event) => setSpecialty(event.target.value)}><option>Todas</option>{["Fade", "Degradê", "Barba", "Barba completa", "Clássico", "Design", "Corte infantil", "Sobrancelha", "Navalha"].map((item) => <option key={item}>{item}</option>)}</select></div>
        <div className="filter-group"><h4>Nota mínima · {Number(rating).toFixed(1)}</h4><input type="range" min="0" max="10" step="0.5" value={rating} onChange={(event) => setRating(event.target.value)} /></div>
        <div className="filter-group"><h4>Preço máximo · R$ {price}</h4><input type="range" min="30" max="250" step="5" value={price} onChange={(event) => setPrice(event.target.value)} /></div>
        <div className="filter-group"><h4>Distância · até {distance} km</h4><input type="range" min="1" max="10" step="1" value={distance} onChange={(event) => setDistance(event.target.value)} /></div>
      </div><label className="filter-check"><input type="checkbox" checked={badgeOnly} onChange={(event) => setBadgeOnly(event.target.checked)} /><ShieldCheck size={14} /> Só Badge of Honour</label></aside>
      <div className="search-results__content">{mapMode ? <div className="map-art map-art--large"><div className="map-art__roads"><i /><i /><i /><i /><i /></div>{filtered.slice(0, 6).map((barber, index) => <Link href={`/barbearia/${barber.slug}`} key={barber.slug} className={`map-pin map-pin--${["one", "two", "three"][index % 3]}`} style={{ top: `${20 + ((index * 17) % 65)}%`, left: `${14 + ((index * 23) % 72)}%` }}><MapPin size={15} /><b>{barber.rating.toFixed(1)}</b></Link>)}<div className="map-art__label">MAPA DE BARBEARIAS · BRASIL</div></div> : loading ? <BarberGridSkeleton count={6} /> : filtered.length ? <div className="barber-grid">{filtered.map((barber) => { const selected = selectedSlugs.includes(barber.slug); return <BarberCard key={barber.slug} barber={barber} onCompare={() => toggleCompare(barber.slug)} isCompared={selected} compareDisabled={selectedSlugs.length >= 3 && !selected} />; })}</div> : <div className="empty-state"><Search size={25} /><b>Nenhuma barbearia encontrada.</b><span>Experimente ampliar os filtros da sua busca.</span><Button variant="outline" onClick={() => { setQuery(""); setCity("Todas as cidades"); setSpecialty("Todas"); setRating("0"); setPrice("250"); setDistance("10"); setBadgeOnly(false); setOpenOnly(false); }}>Limpar filtros</Button></div>}{!mapMode && selectedSlugs.length > 0 && <div className="compare-bar"><span><Scale size={15} /> {selectedSlugs.length} de 3 barbearias selecionadas</span><button className="compare-clear" onClick={() => setSelectedSlugs([])}>Limpar</button><Link className={selectedSlugs.length < 2 ? "is-disabled" : ""} aria-disabled={selectedSlugs.length < 2} href={selectedSlugs.length >= 2 ? `/comparar?barbers=${selectedSlugs.join(",")}` : "#comparar"}>Comparar {selectedSlugs.length} <Scale size={14} /></Link></div>}</div>
    </div>
  </div>;
}
