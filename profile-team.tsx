import Image from "next/image";
import { Star } from "lucide-react";
import { imageUrl } from "@/lib/barbers";

const team = [
  { name: "Caio Mendes", role: "Barbeiro principal", specialties: "Fade · Design", rating: 9.9, image: "photo-1503951914875-452162b0f3f1" },
  { name: "João Pedro", role: "Barbeiro", specialties: "Clássico · Barba", rating: 9.7, image: "photo-1622287162716-f311baa1a2b8" },
  { name: "André Luiz", role: "Barbeiro", specialties: "Corte autoral · Navalha", rating: 9.8, image: "photo-1585747860715-2ba37e788b70" }
];

export function ProfileTeam() {
  return <div className="staff-list">{team.map((member) => <article className="staff-card" key={member.name}><div className="staff-card__avatar"><Image src={imageUrl(member.image, 100)} alt={member.name} fill sizes="42px" /></div><strong>{member.name}</strong><span>{member.role}</span><small>{member.specialties}</small><b className="staff-card__rating"><Star size={11} fill="currentColor" /> {member.rating.toFixed(1)}</b></article>)}</div>;
}
