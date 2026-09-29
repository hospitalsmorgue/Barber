"use client";

import { useState } from "react";
import { Flag } from "lucide-react";
import { useToast } from "@/components/toast-provider";

const reviews = [
  { name: "Lucas Ferreira", initials: "LF", date: "há 3 dias", score: 10, comment: "O Caio entendeu exatamente o que eu queria e ainda sugeriu um acabamento que fez toda a diferença. Ambiente incrível, café bom e zero pressa. Virei cliente.", tags: ["Qualidade do corte", "Atendimento", "Pontualidade"], reply: "Valeu demais, Lucas! Foi um prazer. Te esperamos para o próximo." },
  { name: "Marina Costa", initials: "MC", date: "há 1 semana", score: 9.8, comment: "Levei meu filho pela primeira vez e foi muito tranquilo. Equipe super atenciosa, ele saiu feliz e já pediu para voltar. Recomendo muito!", tags: ["Corte infantil", "Ambiente", "Atendimento"] },
  { name: "Rafael Lima", initials: "RL", date: "há 2 semanas", score: 9.5, comment: "Acabamento impecável e atendimento no horário. Preço justo pela qualidade, e o espaço é muito bonito sem ser pretensioso.", tags: ["Pontualidade", "Preço justo", "Qualidade do corte"] }
];

export function ProfileReviewList({ barberName }: { barberName: string }) {
  const [reported, setReported] = useState<string[]>([]);
  const notify = useToast();
  return <>{reviews.map((review) => <article className="review-card" key={review.name}><div className="review-card__top"><div className="review-person"><span className="review-avatar">{review.initials}</span><span><strong>{review.name}</strong><small>{review.date} · Cliente verificado</small></span></div><span className="review-score">{review.score.toFixed(1)}</span></div><p>{review.comment}</p><div className="review-tags">{review.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="review-actions"><button onClick={() => { setReported((current) => [...current, review.name]); notify("Recebemos seu reporte e vamos analisar esta avaliação.", "info"); }} disabled={reported.includes(review.name)}><Flag size={12} /> {reported.includes(review.name) ? "Reportada" : "Reportar avaliação"}</button></div>{review.reply && <div className="barber-reply"><b>Resposta da {barberName}</b>{review.reply}</div>}</article>)}</>;
}
