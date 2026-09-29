"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Eye, MessageSquare, Save, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HonourBadge } from "@/components/ui/badge";
import { DashboardTeam } from "@/components/dashboard-team";

export function DashboardExperience() {
  const [saved, setSaved] = useState(false);
  const [replied, setReplied] = useState<string[]>([]);
  const [replyText, setReplyText] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const toggleReply = (name: string) => setReplied((current) => {
    const formKey = `${name}-form`;
    return current.includes(formKey) ? current.filter((item) => item !== formKey) : [...current, formKey];
  });
  const reviews = [
    { name: "Lucas Ferreira", score: "10,0", body: "O Caio entendeu exatamente o que eu queria. Virei cliente." },
    { name: "Marina Costa", score: "9,8", body: "Levei meu filho e foi muito tranquilo. Já pediu para voltar." },
    { name: "Rafael Lima", score: "9,5", body: "Acabamento impecável, atendimento no horário." }
  ];
  const months = [{ h: "48%", l: "ABR" }, { h: "62%", l: "MAI" }, { h: "56%", l: "JUN" }, { h: "77%", l: "JUL" }, { h: "69%", l: "AGO" }, { h: "92%", l: "SET" }];

  return <div className="page-shell inner-page">
    <div className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow__line" /> PAINEL DA BARBEARIA</span><h1 className="page-title">Bom dia, Casa Otávio.</h1><p className="profile-about">Veja como sua comunidade está recebendo o seu trabalho.</p></div><HonourBadge /></div>
    <div className="dashboard-grid"><div className="metric-card"><span>Nota média</span><strong>9,8 <Star size={16} fill="currentColor" /></strong><small>↑ 0,2 este mês</small></div><div className="metric-card"><span>Avaliações</span><strong>248</strong><small>↑ 18 novas este mês</small></div><div className="metric-card"><span>Visualizações</span><strong>3.842</strong><small>↑ 12% este mês</small></div><div className="metric-card"><span>Posição na região</span><strong>#01</strong><small>Pinheiros · São Paulo</small></div></div>
    <div className="dashboard-layout">
      <div>
        <section className="dashboard-panel"><h2>Como sua comunidade avalia <span className="panel-caption">ÚLTIMOS 6 MESES</span></h2><div className="chart-bars">{months.map((month) => <i key={month.l} style={{ height: month.h }} data-label={month.l} />)}</div><div className="chart-legend"><span><i /> Nota média · 9,8</span><span><TrendingUp size={12} /> +0,2 no período</span></div></section>
        <section className="dashboard-panel"><h2>Avaliações recentes <span className="new-reviews">3 novas</span></h2>{reviews.map((review) => <div className="dashboard-review" key={review.name}><b>{review.name}</b> <span className="review-score">{review.score}</span><p>{review.body}</p>{replied.includes(review.name) ? <div className="dashboard-inline-reply"><Check size={12} /> Resposta salva: “Obrigado por escolher a gente!”</div> : <><button onClick={() => toggleReply(review.name)}><MessageSquare size={11} /> Responder</button>{replied.includes(`${review.name}-form`) && <div className="reply-entry"><input placeholder="Sua resposta pública..." value={replyText} onChange={(event) => setReplyText(event.target.value)} /><button onClick={() => { setReplied((current) => [...current.filter((item) => item !== `${review.name}-form`), review.name]); setReplyText(""); }}>Publicar</button></div>}</>}</div>)}</section>
      </div>
      <aside>
        <section className="dashboard-panel"><h2>Editar perfil</h2><div className="dashboard-fields"><label className="span-2">Nome da barbearia<input defaultValue="Casa Otávio" /></label><label>Telefone<input defaultValue="(11) 99876-5432" /></label><label>WhatsApp<input defaultValue="(11) 99876-5432" /></label><label className="span-2">Endereço<input defaultValue="Rua dos Pinheiros, 487" /></label><label className="span-2">Especialidades<input defaultValue="Fade, Barba, Degradê" /></label><label className="span-2">Horários<input defaultValue="Ter a sáb · 09h às 20h" /></label><label className="span-2">Sobre<textarea defaultValue="Um espaço de cuidado e estilo no coração de Pinheiros." /></label><label className="span-2">Fotos dos trabalhos<input type="file" accept="image/*" multiple onChange={(event) => setPhotoNames(Array.from(event.target.files ?? []).map((file) => file.name))} /></label></div>{photoNames.length > 0 && <span className="photo-caption">{photoNames.length} foto(s) selecionada(s)</span>}<Button className="save-profile" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 3000); }}><Save size={13} /> {saved ? "Alterações salvas" : "Salvar alterações"}</Button>{saved && <span className="save-caption"><Check size={11} /> Perfil atualizado no protótipo</span>}</section>
        <section className="dashboard-panel dashboard-badge"><ShieldCheck size={20} /><h2>Sua Badge of Honour está ativa.</h2><p>Nota 9,8 e 248 avaliações. Continue fazendo um trabalho incrível.</p><small>PRÓXIMA REVISÃO · 01 OUT 2026</small></section>
        <section className="dashboard-panel region-rank"><h2>Seu ranking na região</h2><b>#1 <span>Pinheiros, São Paulo</span></b><div><Eye size={13} /> No top 1% da sua cidade</div></section>
        <DashboardTeam />
      </aside>
    </div>
  </div>;
}
