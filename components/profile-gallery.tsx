"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react";
import { imageUrl } from "@/lib/barbers";

const works = [
  { image: "photo-1503951914875-452162b0f3f1", type: "Depois", label: "Fade alto" },
  { image: "photo-1621605815971-fbc98d665033", type: "Antes", label: "Antes do degradê" },
  { image: "photo-1599351431202-1e0f0137899a", type: "Depois", label: "Barba e acabamento" },
  { image: "photo-1622287162716-f311baa1a2b8", type: "Vídeo", label: "Finalização na navalha" },
  { image: "photo-1512690459411-b9245aed614b", type: "Antes", label: "Antes do corte" }
];
const filters = ["Todos", "Antes", "Depois", "Vídeos"];

export function ProfileGallery({ barberName, cover }: { barberName: string; cover: string }) {
  const [filter, setFilter] = useState("Todos");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = [{ image: cover, type: "Depois", label: "Corte da semana" }, ...works];
  const visiblePhotos = photos.map((photo, index) => ({ ...photo, index })).filter((photo) => filter === "Todos" || (filter === "Vídeos" ? photo.type === "Vídeo" : photo.type === filter));
  useEffect(() => {
    if (activeIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setActiveIndex(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeIndex]);
  const active = activeIndex === null ? null : photos[activeIndex];
  const move = (step: number) => setActiveIndex((current) => current === null ? null : (current + step + photos.length) % photos.length);
  return <><div className="gallery-toolbar">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div><div className="gallery">{visiblePhotos.map((photo) => <button className="gallery__item" key={`${photo.image}-${photo.index}`} onClick={() => setActiveIndex(photo.index)} aria-label={`${photo.type}: ${photo.label}`}><Image src={imageUrl(photo.image, 700)} alt={`${photo.label} da ${barberName}`} fill sizes="(max-width: 640px) 35vw, 220px" />{photo.type === "Vídeo" && <span className="gallery__play"><Play size={16} fill="currentColor" /></span>}<span className="gallery__label">{photo.type === "Vídeo" ? "VÍDEO" : photo.type.toUpperCase()}</span></button>)}</div>{active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${active.label} · ${barberName}`} onClick={(event) => event.target === event.currentTarget && setActiveIndex(null)}><button className="lightbox__close" aria-label="Fechar galeria" onClick={() => setActiveIndex(null)}><X /></button><button className="lightbox__arrow lightbox__arrow--left" aria-label="Foto anterior" onClick={() => move(-1)}><ArrowLeft /></button><div className="lightbox__image"><Image src={imageUrl(active.image, 1500)} alt={`${active.label} da ${barberName}`} fill sizes="90vw" priority /></div><div className="lightbox__caption">{active.type === "Vídeo" && <Play size={13} />} {active.label} · {(activeIndex ?? 0) + 1} de {photos.length}{active.type === "Vídeo" && <span>Prévia demonstrativa</span>}</div><button className="lightbox__arrow lightbox__arrow--right" aria-label="Próxima foto" onClick={() => move(1)}><ArrowRight /></button></div>}</>;
}
