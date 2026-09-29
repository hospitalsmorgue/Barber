import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { barbers, hasBadge, imageUrl } from "@/lib/barbers";
import { HonourBadge, VerifiedMark } from "@/components/ui/badge";

export const metadata = { title: "Hall da Fama" };

export default function HallOfFamePage({ searchParams }: { searchParams: { cidade?: string } }) {
  const selectedCity = searchParams.cidade ?? "Todas as cidades";
  const cities = Array.from(new Set(barbers.map((barber) => barber.city)));
  const honorees = barbers.filter(hasBadge).filter((barber) => selectedCity === "Todas as cidades" || barber.city === selectedCity).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
  return <>
    <section className="hall-hero"><div className="page-shell hall-hero__inner"><div><span className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> EXCELÊNCIA RECONHECIDA</span><h1>Hall da Fama.</h1><p>Os lugares que fazem tudo com excelência. Conquistaram o selo na cadeira, diante de clientes de verdade.</p></div><span className="hall-hero__number">{String(honorees.length).padStart(2, "0")}</span></div></section>
    <section className="page-shell inner-page"><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow__line" /> {selectedCity === "Todas as cidades" ? "BRASIL" : selectedCity.toUpperCase()} · SETEMBRO 2026</span><h2>Os melhores da casa.</h2></div><HonourBadge /></div><nav className="city-rank-filter" aria-label="Filtrar ranking por cidade"><Link href="/hall-da-fama" className={selectedCity === "Todas as cidades" ? "active" : ""}>Brasil</Link>{cities.map((city) => <Link key={city} href={`/hall-da-fama?cidade=${encodeURIComponent(city)}`} className={selectedCity === city ? "active" : ""}>{city}</Link>)}</nav><div className="weekly-grid">{honorees.map((barber, index) => <Link href={`/barbearia/${barber.slug}`} className="hall-rank" key={barber.slug}><span className="hall-rank__num">{String(index + 1).padStart(2, "0")}</span><div className="hall-rank__image"><Image src={imageUrl(barber.cover, 320)} alt="" fill sizes="90px" /></div><div className="hall-rank__info"><HonourBadge compact /><strong>{barber.name} {barber.verified && <VerifiedMark />}</strong><span>{barber.neighborhood}, {barber.city} · {barber.reviews} avaliações</span></div><span className="hall-rank__score">{barber.rating.toFixed(1)} <Star size={12} fill="currentColor" /></span><ArrowUpRight size={16} color="#85837a" /></Link>)}</div><div className="hall-explainer"><h3>Não é indicação paga. É reconhecimento.</h3><p>A Badge of Honour é concedida automaticamente a barbearias que mantêm média igual ou superior a 9,5 e pelo menos 15 avaliações válidas. A elegibilidade é recalculada todo mês.</p><Link href="/como-funciona" className="text-link">Entenda os critérios <ArrowUpRight size={15} /></Link></div></section>
  </>;
}
