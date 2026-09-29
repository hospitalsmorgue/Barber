import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clock3, MapPin, Star, X } from "lucide-react";
import { barbers, hasBadge, imageUrl } from "@/lib/barbers";
import { isOpenNow } from "@/lib/opening-hours";
import { HonourBadge, VerifiedMark } from "@/components/ui/badge";

export const metadata = { title: "Comparar barbearias" };

export default function ComparePage({ searchParams }: { searchParams: { barbers?: string } }) {
  const selectedSlugs = (searchParams.barbers ?? "").split(",").filter(Boolean).slice(0, 3);
  const selected = selectedSlugs.map((slug) => barbers.find((barber) => barber.slug === slug)).filter((barber) => barber !== undefined);
  if (selected.length < 2) return <div className="page-shell inner-page"><div className="page-topline"><Link href="/busca"><ArrowLeft size={12} /> Voltar à busca</Link></div><div className="empty-state compare-empty"><Star size={28} /><h1>Compare lado a lado.</h1><span>Selecione duas ou três barbearias nos resultados para comparar nota, preço e localização.</span><Link href="/busca" className="text-link">Escolher barbearias <ArrowUpRight size={15} /></Link></div></div>;
  const rows = [
    { label: "Nota da comunidade", render: (barber: typeof selected[number]) => <span className="compare-rating"><Star size={14} fill="currentColor" /> {barber.rating.toFixed(1)} <small>{barber.reviews} avaliações</small></span> },
    { label: "Badge of Honour", render: (barber: typeof selected[number]) => hasBadge(barber) ? <HonourBadge compact /> : <span className="compare-muted"><X size={14} /> Ainda não elegível</span> },
    { label: "Preço inicial", render: (barber: typeof selected[number]) => <b>A partir de R$ {barber.price}</b> },
    { label: "Distância", render: (barber: typeof selected[number]) => <span><MapPin size={13} /> {barber.distance.toFixed(1)} km</span> },
    { label: "Funcionamento", render: (barber: typeof selected[number]) => <span className={`open-status ${isOpenNow(barber) ? "is-open" : ""}`}><i />{isOpenNow(barber) ? "Aberto agora" : "Fechado agora"}</span> },
    { label: "Especialidades", render: (barber: typeof selected[number]) => <span className="compare-specialties">{barber.specialties.join(" · ")}</span> }
  ];
  return <div className="page-shell inner-page"><div className="page-topline"><Link href="/busca"><ArrowLeft size={12} /> Voltar à busca</Link></div><div className="inner-page__intro"><span className="eyebrow"><span className="eyebrow__line" /> ESCOLHA COM MAIS CERTEZA</span><h1 className="page-title">Lado a lado.</h1><p>Dados públicos, avaliações da comunidade e o seu próximo lugar favorito.</p></div><div className="compare-table" style={{ "--compare-columns": selected.length } as React.CSSProperties}><div className="compare-header"><div className="compare-label">O QUE IMPORTA</div>{selected.map((barber) => <Link href={`/barbearia/${barber.slug}`} className="compare-barber" key={barber.slug}><div className="compare-cover"><Image src={imageUrl(barber.cover, 500)} alt="" fill sizes="(max-width: 640px) 30vw, 250px" /></div><strong>{barber.name} {barber.verified && <VerifiedMark />}</strong><span>{barber.neighborhood}, {barber.city}</span><span className="compare-profile-link">Ver perfil <ArrowUpRight size={12} /></span></Link>)}</div>{rows.map((row) => <div className="compare-row" key={row.label}><strong>{row.label}</strong>{selected.map((barber) => <div key={barber.slug}>{row.render(barber)}</div>)}</div>)}</div></div>;
}
