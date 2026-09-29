"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3, MapPin, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BarberCard } from "@/components/barber-card";
import { BarberGridSkeleton } from "@/components/skeletons";
import { HomeSearchDock } from "@/components/home-search-dock";
import { Onboarding } from "@/components/onboarding";
import { Button } from "@/components/ui/button";
import { barbers, imageUrl } from "@/lib/barbers";
import { isOpenNow } from "@/lib/opening-hours";

export function HomeExperience() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("Todas as especialidades");
  const [badgeOnly, setBadgeOnly] = useState(false);
  const [minRating, setMinRating] = useState("Qualquer nota");
  const [maxDistance, setMaxDistance] = useState("10");
  const [maxPrice, setMaxPrice] = useState("250");
  const [openOnly, setOpenOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timeout);
  }, []);
  const visibleBarbers = useMemo(() => barbers.filter((barber) => {
    const matchesQuery = `${barber.name} ${barber.neighborhood} ${barber.city} ${barber.specialties.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    const matchesSpecialty = specialty === "Todas as especialidades" || barber.specialties.includes(specialty);
    const matchesBadge = !badgeOnly || (barber.rating >= 9.5 && barber.reviews >= 15);
    const matchesRating = minRating === "Qualquer nota" || barber.rating >= Number(minRating);
    return matchesQuery && matchesSpecialty && matchesBadge && matchesRating && barber.distance <= Number(maxDistance) && barber.price <= Number(maxPrice) && (!openOnly || isOpenNow(barber));
  }), [query, specialty, badgeOnly, minRating, maxDistance, maxPrice, openOnly]);

  return <>
    <section className="hero">
      <div className="hero__backdrop" />
      <div className="hero__grain" />
      <div className="hero__content page-shell">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="hero__copy">
          <span className="eyebrow"><span className="eyebrow__line" /> A COMUNIDADE DE BARBEARIA DO BRASIL</span>
          <h1>Seu próximo<br />corte tem <em>endereço.</em></h1>
          <p>Trabalho de verdade. Opinião de quem foi.<br className="desktop-break" /> Encontre o lugar certo para se sentir você.</p>
          <div className="hero__proof"><div className="avatar-stack"><span>R</span><span>M</span><span>D</span><span>+</span></div><span>Mais de <b>18 mil pessoas</b> encontraram seu corte.</span></div>
        </motion.div>
        <motion.div className="hero__side-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }}><span className="hero__side-number">01 — 26</span><span>Curadoria feita<br />pela comunidade</span><ArrowDownRight size={18} /></motion.div>
      </div>
      <HomeSearchDock badgeOnly={badgeOnly} onBadgeChange={setBadgeOnly} />
    </section>
    <Onboarding />

    <section className="home-section page-shell" id="explorar">
      <div className="section-heading"><div><span className="eyebrow"><span className="eyebrow__line" /> FEITO PARA O SEU ESTILO</span><h2>O próximo grande<br className="mobile-break" /> corte começa aqui.</h2></div><Link href="/busca" className="text-link">Explorar todas <ArrowUpRight size={16} /></Link></div>
      <div className="discovery-bar"><span className="discovery-bar__label"><SlidersHorizontal size={15} /> ENCONTRE O SEU</span><div className="quick-filter"><Star size={15} /><select value={minRating} onChange={(event) => setMinRating(event.target.value)} aria-label="Nota mínima"><option>Qualquer nota</option><option value="9.5">9,5 ou mais</option><option value="9">9,0 ou mais</option></select><ChevronDown size={13} /></div><div className="quick-filter"><Sparkles size={15} /><select value={specialty} onChange={(event) => setSpecialty(event.target.value)} aria-label="Especialidade"><option>Todas as especialidades</option>{["Fade", "Barba", "Degradê", "Clássico", "Design", "Corte infantil"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></div><div className="quick-filter"><MapPin size={14} /><select value={maxDistance} onChange={(event) => setMaxDistance(event.target.value)} aria-label="Distância"><option value="10">Até 10 km</option><option value="5">Até 5 km</option><option value="3">Até 3 km</option></select><ChevronDown size={13} /></div><div className="quick-filter"><span className="price-filter-mark">R$</span><select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Preço máximo"><option value="250">Qualquer preço</option><option value="60">Até R$ 60</option><option value="80">Até R$ 80</option></select><ChevronDown size={13} /></div><button onClick={() => setBadgeOnly(!badgeOnly)} className={`filter-pill ${badgeOnly ? "is-active" : ""}`} aria-pressed={badgeOnly}>{badgeOnly ? <Check size={14} /> : <ShieldCheck size={14} />} Badge of Honour</button><button onClick={() => setOpenOnly(!openOnly)} className={`filter-pill ${openOnly ? "is-active" : ""}`} aria-pressed={openOnly}><Clock3 size={14} /> Aberto agora</button><Link href="/busca" className="discovery-bar__advanced">Mais filtros <ArrowRight size={14} /></Link></div>
      <div className="results-meta"><span>{visibleBarbers.length} lugares que valem a visita</span><span><span className="live-dot" /> Atualizado agora</span></div>
      {loading ? <BarberGridSkeleton count={6} /> : visibleBarbers.length ? <div className="barber-grid">{visibleBarbers.slice(0, 6).map((barber, index) => <motion.div key={barber.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ delay: index * .07, duration: .45 }}><BarberCard barber={barber} /></motion.div>)}</div> : <div className="empty-state"><Search size={25} /><b>Nenhum corte por aqui ainda.</b><span>Tente outra busca ou ajuste os filtros.</span></div>}
      <div className="center-action"><Link href={`/busca?q=${encodeURIComponent(query)}`}><Button variant="outline">Ver todos os resultados <ArrowRight size={16} /></Button></Link></div>
    </section>

    <section className="honour-feature"><div className="honour-feature__grid page-shell"><div className="honour-feature__copy"><span className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> O SELO QUE NÃO SE COMPRA</span><h2>Excelência não<br />precisa de <em>filtro.</em></h2><p>Nota 9,5 ou mais. Pelo menos 15 avaliações reais. A Badge of Honour é conquistada corte a corte — e renovada todos os meses.</p><Link className="text-link text-link--gold" href="/hall-da-fama">Conheça os melhores <ArrowUpRight size={16} /></Link><div className="honour-feature__stats"><div><strong>9,5+</strong><span>NOTA MÍNIMA</span></div><div><strong>15</strong><span>AVALIAÇÕES REAIS</span></div><div><strong>0</strong><span>ATALHOS</span></div></div></div><div className="honour-feature__seal"><div className="seal"><div className="seal__inner"><ShieldCheck size={35} strokeWidth={1.2} /><span>BADGE OF</span><b>HONOUR</b><i>EXCELÊNCIA RECONHECIDA</i></div></div><span className="seal-note">CONQUISTADA, NUNCA COMPRADA</span><div className="honour-feature__tick"><Check size={13} /> Renovação mensal</div></div></div></section>

    <section className="home-section home-section--weekly page-shell"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow__line" /> A COMUNIDADE ESCOLHEU</span><h2>Melhores da semana.</h2></div><Link href="/hall-da-fama" className="text-link">Ver Hall da Fama <ArrowUpRight size={16} /></Link></div><div className="weekly-grid">{barbers.filter((barber) => barber.rating >= 9.5 && barber.reviews >= 15).slice(0, 3).map((barber, index) => <Link href={`/barbearia/${barber.slug}`} className="weekly-item" key={barber.slug}><span className="weekly-item__rank">0{index + 1}</span><div className="weekly-item__image"><Image src={imageUrl(barber.cover, 440)} alt="" fill sizes="(max-width: 700px) 30vw, 18vw" /></div><div className="weekly-item__info"><HonourMark /><h3>{barber.name}</h3><span>{barber.neighborhood} · {barber.city}</span></div><div className="weekly-item__score"><b>{barber.rating.toFixed(1)}</b><Star size={13} fill="currentColor" /></div><ArrowUpRight className="weekly-item__arrow" size={17} /></Link>)}</div></section>

    <section className="map-teaser"><div className="page-shell map-teaser__inner"><div><span className="eyebrow"><span className="eyebrow__line" /> O BAIRRO, DO SEU JEITO</span><h2>Tem um bom corte<br />perto de você.</h2><p>Explore barbearias ao redor, compare avaliações e encontre seu próximo lugar favorito.</p><Link href="/busca?mapa=1"><Button>Explorar o mapa <MapPin size={16} /></Button></Link></div><div className="map-art" aria-label="Mapa ilustrativo de barbearias próximas"><div className="map-art__roads"><i /><i /><i /><i /><i /></div><span className="map-pin map-pin--one"><MapPin size={17} /><b>9,8</b></span><span className="map-pin map-pin--two"><MapPin size={17} /><b>9,7</b></span><span className="map-pin map-pin--three"><MapPin size={17} /><b>9,5</b></span><span className="map-art__you">VOCÊ ESTÁ AQUI</span><div className="map-art__label">PINHEIROS · SÃO PAULO</div><div className="map-art__zoom">+<br />−</div></div></div></section>

    <section className="final-cta page-shell"><div><span className="eyebrow"><span className="eyebrow__line" /> SUA PRÓXIMA HISTÓRIA COMEÇA AQUI</span><h2>Um bom corte muda<br /><em>o seu dia inteiro.</em></h2></div><Link href="/busca"><Button size="lg">Encontrar minha barbearia <ArrowUpRight size={17} /></Button></Link><span className="final-cta__index">SHOW DE BARBER / 2026</span></section>
  </>;
}

function HonourMark() { return <span className="weekly-item__badge"><ShieldCheck size={12} /> BADGE OF HONOUR</span>; }
