"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Scale, Star } from "lucide-react";
import { Barber, hasBadge, imageUrl } from "@/lib/barbers";
import { useFavorite } from "@/components/use-favorite";
import { useOpenStatus } from "@/components/use-open-status";
import { useToast } from "@/components/toast-provider";
import { HonourBadge, VerifiedMark } from "@/components/ui/badge";

export function BarberCard({ barber, onCompare, isCompared = false, compareDisabled = false }: { barber: Barber; onCompare?: () => void; isCompared?: boolean; compareDisabled?: boolean }) {
  const { isFavorite, toggle } = useFavorite(barber.slug);
  const openNow = useOpenStatus(barber);
  const notify = useToast();
  const badge = hasBadge(barber);
  return <article className="barber-card">
    <Link href={`/barbearia/${barber.slug}`} className="barber-card__image">
      <Image src={imageUrl(barber.cover, 800)} alt={`Interior da ${barber.name}`} fill sizes="(max-width: 640px) 90vw, (max-width: 1100px) 44vw, 30vw" />
      {badge && <HonourBadge compact className="barber-card__badge" />}
      <span className={`open-status ${openNow ? "is-open" : ""}`}><i />{openNow ? "Aberto agora" : "Fechado agora"}</span>
      <span className="barber-card__price">A partir de <b>R$ {barber.price}</b></span>
    </Link>
    <div className="barber-card__body">
      <div className="barber-card__heading"><div><Link href={`/barbearia/${barber.slug}`} className="barber-card__name">{barber.name}</Link>{barber.verified && <VerifiedMark />}</div><span className="barber-card__rating"><Star size={14} fill="currentColor" /> {barber.rating.toFixed(1)}</span></div>
      <p className="barber-card__location"><MapPin size={13} /> {barber.neighborhood}, {barber.city} <span>· {barber.distance.toFixed(1)} km</span></p>
      <div className="barber-card__bottom"><span>{barber.reviews} avaliações</span><div className="barber-card__tags">{barber.specialties.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>{onCompare && <button className={`card-compare ${isCompared ? "is-selected" : ""}`} disabled={compareDisabled} aria-pressed={isCompared} onClick={onCompare}><Scale size={13} /> {isCompared ? "Selecionada" : "Comparar"}</button>}<button className={`favorite-button ${isFavorite ? "is-favorite" : ""}`} aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"} aria-pressed={isFavorite} onClick={() => { toggle(); notify(isFavorite ? `${barber.name} removida dos favoritos.` : `${barber.name} salva nos favoritos.`); }}><Heart size={17} fill={isFavorite ? "currentColor" : "none"} /></button></div>
    </div>
  </article>;
}
