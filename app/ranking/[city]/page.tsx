import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { barbers, hasBadge, imageUrl } from "@/lib/barbers";
import { HonourBadge, VerifiedMark } from "@/components/ui/badge";

const cities: Record<string, string> = {
  "sao-paulo": "São Paulo",
  "rio-de-janeiro": "Rio de Janeiro",
  "belo-horizonte": "Belo Horizonte",
  curitiba: "Curitiba",
  "porto-alegre": "Porto Alegre"
};
const periods = ["semana", "mes", "geral"] as const;
type Period = typeof periods[number];
const periodLabel: Record<Period, string> = { semana: "Esta semana", mes: "Este mês", geral: "Geral" };
const weeklyScore: Record<string, number> = { "casa-otavio": 9.9, "barbearia-navalha": 9.8, "estudio-sete": 9.9, "barba-brava": 9.7, "dom-rafael": 9.9, "corte-carioca": 9.8, "senhor-barbado": 9.7, "o-cavalheiro": 9.6, "linha-fina": 9.5, "black-anchor": 9.4, "bigode-club": 9.4, "santo-corte": 9.3 };
const monthlyScore: Record<string, number> = { "casa-otavio": 9.8, "barbearia-navalha": 9.8, "estudio-sete": 9.9, "barba-brava": 9.6, "dom-rafael": 9.8, "corte-carioca": 9.7, "senhor-barbado": 9.7, "o-cavalheiro": 9.5, "linha-fina": 9.5, "black-anchor": 9.4, "bigode-club": 9.3, "santo-corte": 9.2 };

export function generateStaticParams() { return Object.keys(cities).map((city) => ({ city })); }

export default function CityRankingPage({ params, searchParams }: { params: { city: string }; searchParams: { periodo?: string } }) {
  const cityName = cities[params.city];
  if (!cityName) notFound();
  const period = periods.includes(searchParams.periodo as Period) ? searchParams.periodo as Period : "geral";
  const ranking = barbers.filter((barber) => barber.city === cityName).sort((a, b) => scoreFor(b.slug, b.rating, period) - scoreFor(a.slug, a.rating, period)).slice(0, 10);
  return <><section className="hall-hero"><div className="page-shell hall-hero__inner"><div><span className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> RANKING DA COMUNIDADE</span><h1>Top 10 de<br />{cityName}.</h1><p>As barbearias mais bem avaliadas de {cityName}, escolhidas por quem já sentou na cadeira.</p></div><span className="hall-hero__number">10</span></div></section><section className="page-shell inner-page"><div className="ranking-controls"><nav className="city-rank-filter" aria-label="Escolher cidade">{Object.entries(cities).map(([slug, name]) => <Link key={slug} href={`/ranking/${slug}?periodo=${period}`} className={slug === params.city ? "active" : ""}>{name}</Link>)}</nav><nav className="period-filter" aria-label="Período do ranking">{periods.map((item) => <Link key={item} href={`/ranking/${params.city}?periodo=${item}`} className={period === item ? "active" : ""}>{periodLabel[item]}</Link>)}</nav></div><div className="section-heading"><div><span className="eyebrow"><span className="eyebrow__line" /> {periodLabel[period].toUpperCase()} · ATUALIZADO AGORA</span><h2>Quem está fazendo bonito.</h2></div><Link href="/hall-da-fama" className="text-link">Hall da Fama <ArrowUpRight size={15} /></Link></div><div className="weekly-grid">{ranking.map((barber, index) => <Link href={`/barbearia/${barber.slug}`} className="hall-rank" key={barber.slug}><span className="hall-rank__num">{String(index + 1).padStart(2, "0")}</span><div className="hall-rank__image"><Image src={imageUrl(barber.cover, 320)} alt="" fill sizes="90px" /></div><div className="hall-rank__info">{hasBadge(barber) && <HonourBadge compact />}<strong>{barber.name} {barber.verified && <VerifiedMark />}</strong><span>{barber.neighborhood} · {barber.reviews} avaliações</span></div><span className="hall-rank__score">{scoreFor(barber.slug, barber.rating, period).toFixed(1)} <Star size={12} fill="currentColor" /></span><ArrowUpRight size={16} color="#85837a" /></Link>)}</div>{ranking.length === 0 && <div className="empty-state"><Star /><b>Este ranking está chegando.</b><span>Novas barbearias aparecem quando a comunidade avalia.</span></div>}<p className="ranking-note">O ranking é calculado com avaliações mockadas para esta demonstração. A Badge of Honour continua seguindo a média geral e o mínimo de 15 avaliações.</p></section></>;
}

function scoreFor(slug: string, rating: number, period: Period) { return period === "semana" ? weeklyScore[slug] ?? rating : period === "mes" ? monthlyScore[slug] ?? rating : rating; }
