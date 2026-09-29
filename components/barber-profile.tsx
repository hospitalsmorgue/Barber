"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, CalendarDays, Check, Clock3, Heart, MapPin, MessageCircle, Phone, ShieldCheck, Star, Upload, Users } from "lucide-react";
import { Barber, hasBadge, imageUrl } from "@/lib/barbers";
import { useOpenStatus } from "@/components/use-open-status";
import { useCheckIn } from "@/components/use-check-in";
import { useFavorite } from "@/components/use-favorite";
import { useToast } from "@/components/toast-provider";
import { ProfileGallery } from "@/components/profile-gallery";
import { ProfileReviewList } from "@/components/profile-review-list";
import { ProfileTeam } from "@/components/profile-team";
import { HonourBadge, VerifiedMark } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const reviewSchema = z.object({ score: z.coerce.number().min(1).max(10), comment: z.string().trim().min(10, "Conte um pouco mais sobre sua experiência (mínimo de 10 caracteres)."), tags: z.array(z.string()).min(1, "Escolha pelo menos uma característica do atendimento.") });
type ReviewValues = z.infer<typeof reviewSchema>;
const quickTags = ["Pontualidade", "Atendimento", "Qualidade do corte", "Ambiente", "Preço justo"];

export function BarberProfile({ barber }: { barber: Barber }) {
  const badge = hasBadge(barber);
  const { isFavorite, toggle: toggleFavorite } = useFavorite(barber.slug);
  const { checkedIn, checkIn } = useCheckIn(barber.slug);
  const openNow = useOpenStatus(barber);
  const notify = useToast();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ReviewValues>({ resolver: zodResolver(reviewSchema), defaultValues: { score: 9, comment: "", tags: [] } });
  const liveScore = watch("score");
  const toggleTag = (tag: string) => {
    const next = chosenTags.includes(tag) ? chosenTags.filter((item) => item !== tag) : [...chosenTags, tag];
    setChosenTags(next);
    setValue("tags", next, { shouldValidate: true });
  };
  const submitReview = (values: ReviewValues) => {
    if (!checkedIn) {
      notify("Faça check-in na barbearia antes de enviar sua avaliação.", "info");
      return;
    }
    setReviewSent(true);
    console.info("Avaliação mockada", { ...values, barber: barber.slug, photo: photoName || undefined });
    notify("Sua avaliação foi registrada. Obrigado por compartilhar! ");
  };
  const handleCheckIn = () => {
    checkIn();
    notify(`Check-in feito em ${barber.name}. Agora você pode avaliar sua visita.`);
  };
  return <>
    <div className="profile-cover"><Image src={imageUrl(barber.cover, 1800)} alt={`Ambiente da ${barber.name}`} fill priority sizes="100vw" /></div>
    <div className="page-shell profile-content">
      <div className="page-topline"><Link href="/busca">Explorar</Link><span>/</span>{barber.city}<span>/</span>{barber.name}</div>
      <div className="profile-head"><div className="profile-avatar"><Image src={imageUrl(barber.avatar, 240)} alt={`Marca da ${barber.name}`} fill sizes="105px" /></div><div className="profile-title"><h1>{barber.name} {barber.verified && <VerifiedMark />}</h1><p>{barber.neighborhood}, {barber.city} · Barbearia desde 2018</p><span className={`open-status profile-open-status ${openNow ? "is-open" : ""}`} aria-live="polite"><i />{openNow ? "Aberto agora" : "Fechado agora"}</span></div><div className="profile-head__actions"><Button onClick={() => { setBookingOpen(true); setBookingSent(false); }}><CalendarDays size={15} /> Agendar horário</Button><a href={`https://wa.me/${barber.phone}`} target="_blank" rel="noreferrer"><Button variant="outline"><MessageCircle size={15} /> WhatsApp</Button></a><Button variant={checkedIn ? "subtle" : "outline"} onClick={handleCheckIn} aria-pressed={checkedIn}><Check size={15} /> {checkedIn ? "Check-in feito" : "Fazer check-in"}</Button></div></div>
      <div className="profile-stats"><div className="profile-rating"><strong>{barber.rating.toFixed(1)}</strong><span><b>EXCELENTE</b>{barber.reviews} avaliações</span></div>{badge && <div className="profile-stat"><HonourBadge /><small>CONQUISTADA PELA COMUNIDADE</small></div>}<div className="profile-stat"><b>R$ {barber.price}–{barber.price + 45}</b><small>PREÇO MÉDIO</small></div><div className="profile-stat"><b>{barber.distance.toFixed(1)} km</b><small>DE VOCÊ</small></div><button className={`favorite-button profile-favorite ${isFavorite ? "is-favorite" : ""}`} aria-pressed={isFavorite} onClick={() => { toggleFavorite(); notify(isFavorite ? "Barbearia removida dos favoritos." : "Barbearia salva nos favoritos."); }}><Heart size={18} fill={isFavorite ? "currentColor" : "none"} /> {isFavorite ? "Salvo" : "Salvar"}</button></div>
      <div className="profile-columns"><div className="profile-main"><section><h2>Sobre a casa</h2><p className="profile-about">{barber.description} Cada atendimento é pensado para valorizar o seu estilo, com profissionais que escutam antes de começar e entregam capricho até no último detalhe.</p><div className="specialty-list">{barber.specialties.map((specialty) => <span key={specialty}>{specialty}</span>)}{["Corte clássico", "Sobrancelha"].map((tag) => <span key={tag}>{tag}</span>)}</div></section>
        <section><h2>Trabalhos recentes</h2><ProfileGallery barberName={barber.name} cover={barber.cover} /></section>
        <section><h2>Quem vai cuidar do seu corte</h2><ProfileTeam /></section>
        <section><div className="section-heading"><div><h2>Quem já sentou na cadeira.</h2><p className="profile-about">Avaliações de clientes verificados após o atendimento.</p></div><span className="profile-rating"><strong style={{ fontSize: 22 }}>{barber.rating.toFixed(1)}</strong><Star size={14} fill="currentColor" color="#d4af37" /></span></div><ProfileReviewList barberName={barber.name} /></section>
        <section className="review-form" id="avaliar"><h2>Já veio? Conte como foi.</h2><p>Sua opinião ajuda alguém a encontrar o próximo corte.</p>{!checkedIn && <div className="review-checkin-gate"><Check size={16} /><span>Faça check-in na barbearia para liberar sua avaliação.</span><Button size="sm" onClick={handleCheckIn}>Fazer check-in</Button></div>}{reviewSent ? <div className="auth-notice"><Check size={15} /> Avaliação registrada no protótipo. Obrigado por fortalecer a comunidade!</div> : <form onSubmit={handleSubmit(submitReview)} noValidate><div className="review-form__field"><label htmlFor="score">Sua nota <span>(1 a 10)</span></label><div className="rating-range"><input id="score" type="range" min="1" max="10" step="0.1" {...register("score", { valueAsNumber: true })} /><output>{Number(liveScore).toFixed(1)}</output></div></div><div className="review-form__field"><label htmlFor="comment">Sua experiência</label><textarea id="comment" placeholder="O que mais gostou? Como foi o atendimento?" {...register("comment")} />{errors.comment && <span className="form-error">{errors.comment.message}</span>}</div><div className="review-form__field"><label>O que se destacou?</label><div className="review-tags">{quickTags.map((tag) => <button type="button" key={tag} onClick={() => toggleTag(tag)} className={chosenTags.includes(tag) ? "selected-review-tag" : ""}>{chosenTags.includes(tag) && <Check size={11} />}{tag}</button>)}</div>{errors.tags && <span className="form-error">{errors.tags.message}</span>}</div><div className="review-form__field"><label htmlFor="review-photo">Foto do corte (opcional)</label><label className="upload-trigger" htmlFor="review-photo"><Upload size={14} /> {photoName || "Adicionar foto"}</label><input id="review-photo" type="file" accept="image/*" hidden onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")} /></div><Button type="submit" className="review-submit" disabled={!checkedIn}>Enviar avaliação <ArrowUpRight size={14} /></Button></form>}</section>
      </div><aside className="profile-aside"><h3>Visite a casa</h3><div className="profile-aside__line"><MapPin size={15} /><span>{barber.address}<br />{barber.neighborhood}, {barber.city}</span></div><a className="profile-map-link" href={`https://maps.google.com/?q=${encodeURIComponent(`${barber.address}, ${barber.city}`)}`} target="_blank" rel="noreferrer" aria-label={`Ver ${barber.name} no mapa`}><div className="map-art profile-map"><div className="map-art__roads"><i /><i /><i /><i /></div><span className="map-pin map-pin--one"><MapPin size={15} /><b>{barber.rating.toFixed(1)}</b></span><div className="map-art__label">{barber.neighborhood.toUpperCase()} · {barber.city.toUpperCase()}</div></div></a><div className="profile-aside__line"><Clock3 size={15} /><span>{barber.hours}<br /><small className={openNow ? "text-open" : ""}>{openNow ? "Aberto agora" : "Fechado agora"} · horário local</small></span></div><div className="profile-aside__line"><Phone size={15} /><span>+55 {barber.phone.slice(2)}</span></div><div className="profile-aside__line"><Users size={15} /><span>Atendimento com hora marcada</span></div><Button onClick={handleCheckIn} variant={checkedIn ? "subtle" : "outline"} className="w-full" aria-pressed={checkedIn}><Check size={15} /> {checkedIn ? "Check-in feito" : "Fazer check-in"}</Button><Button onClick={() => { setBookingOpen(true); setBookingSent(false); }} className="w-full"><CalendarDays size={15} /> Agendar agora</Button><a href={`https://wa.me/${barber.phone}`} target="_blank" rel="noreferrer"><Button variant="outline" className="w-full"><MessageCircle size={15} /> Chamar no WhatsApp</Button></a><Link href="/como-funciona" className="profile-aside__line"><ShieldCheck size={15} /><span>Como funciona a Badge of Honour <ArrowUpRight size={12} /></span></Link></aside></div>
    </div>
    {bookingOpen && <div className="booking-overlay" role="presentation" onClick={(event) => event.target === event.currentTarget && setBookingOpen(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><h2 id="booking-title">{bookingSent ? "Pedido enviado." : "Seu próximo corte."}</h2>{bookingSent ? <><p>Pedido de horário enviado para {barber.name}. A confirmação chega pelo WhatsApp.</p><Button onClick={() => setBookingOpen(false)} className="w-full">Fechar</Button></> : <><p>Escolha um horário. A barbearia confirma sua reserva em seguida.</p><label htmlFor="booking-date">Data</label><input id="booking-date" type="date" min={new Date().toISOString().slice(0, 10)} /><label htmlFor="booking-time">Horário preferido</label><select id="booking-time"><option>09:00</option><option>10:30</option><option>12:00</option><option>14:00</option><option>15:30</option><option>17:00</option><option>18:30</option></select><div className="booking-modal__actions"><Button variant="outline" onClick={() => setBookingOpen(false)}>Voltar</Button><Button onClick={() => setBookingSent(true)}>Solicitar horário</Button></div></>}</div></div>}
  </>;
}

