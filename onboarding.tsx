"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Scissors, ShieldCheck, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  { icon: Scissors, eyebrow: "SEU PRÓXIMO CORTE", title: "Encontre o lugar\ncom a sua cara.", copy: "Explore barbearias por bairro, cidade, especialidade e preço. Veja o trabalho antes de sentar na cadeira." },
  { icon: Star, eyebrow: "OPINIÃO DE QUEM FOI", title: "Avaliações que\nvalem de verdade.", copy: "Notas de 1 a 10, comentários detalhados e fotos feitas por clientes depois do atendimento." },
  { icon: ShieldCheck, eyebrow: "BADGE OF HONOUR", title: "Excelência que\nnão se compra.", copy: "Nota média 9,5 ou mais e pelo menos 15 avaliações. O selo dourado é conquistado na prática." }
];
const STORAGE_KEY = "show-de-barber:onboarding-complete";

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => { if (!localStorage.getItem(STORAGE_KEY)) setOpen(true); }, []);
  const finish = () => { localStorage.setItem(STORAGE_KEY, "1"); setOpen(false); };
  if (!open) return null;
  const SlideIcon = slides[step].icon;
  return <div className="onboarding-backdrop"><section className="onboarding" role="dialog" aria-modal="true" aria-labelledby="onboarding-title"><button className="onboarding__close" onClick={finish} aria-label="Fechar apresentação"><X size={18} /></button><div className="onboarding__visual"><div className="onboarding__seal"><SlideIcon size={36} strokeWidth={1.4} /></div><span>SHOW DE BARBER · 0{step + 1}/03</span></div><div className="onboarding__content"><span className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> {slides[step].eyebrow}</span><h2 id="onboarding-title">{slides[step].title.split("\n").map((line) => <span key={line}>{line}<br /></span>)}</h2><p>{slides[step].copy}</p><div className="onboarding__dots">{slides.map((slide, index) => <button key={slide.eyebrow} onClick={() => setStep(index)} aria-label={`Etapa ${index + 1}`} aria-current={step === index ? "step" : undefined} className={step === index ? "active" : ""} />)}</div><div className="onboarding__actions"><button onClick={finish}>Pular apresentação</button><Button onClick={() => step === slides.length - 1 ? finish() : setStep(step + 1)}>{step === slides.length - 1 ? "Começar a explorar" : "Continuar"}{step === slides.length - 1 ? <Check size={15} /> : <ArrowRight size={15} />}</Button></div></div></section></div>;
}
