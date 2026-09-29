"use client";

import { useState, type FormEvent } from "react";
import { Plus, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/toast-provider";

type Professional = { id: number; name: string; specialty: string };
export function DashboardTeam() {
  const [members, setMembers] = useState<Professional[]>([{ id: 1, name: "Caio Mendes", specialty: "Fade · Design" }, { id: 2, name: "João Pedro", specialty: "Clássico · Barba" }, { id: 3, name: "André Luiz", specialty: "Corte autoral · Navalha" }]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const notify = useToast();
  const addMember = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !specialty.trim()) return;
    setMembers((current) => [...current, { id: Date.now(), name: name.trim(), specialty: specialty.trim() }]);
    setName("");
    setSpecialty("");
    notify("Profissional adicionado à equipe.");
  };
  return <section className="dashboard-panel"><h2>Equipe profissional</h2><div className="manage-team-list">{members.map((member) => <div className="manage-team-row" key={member.id}><span><UserRound size={14} /></span><div><b>{member.name}</b><small>{member.specialty}</small></div><button aria-label={`Remover ${member.name}`} onClick={() => { setMembers((current) => current.filter((item) => item.id !== member.id)); notify(`${member.name} removido da equipe.`, "info"); }}><Trash2 size={13} /></button></div>)}</div><form className="team-add-form" onSubmit={addMember}><input aria-label="Nome do profissional" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nome do profissional" /><input aria-label="Especialidades do profissional" value={specialty} onChange={(event) => setSpecialty(event.target.value)} placeholder="Especialidades" /><Button type="submit" size="sm" aria-label="Adicionar profissional"><Plus size={14} /></Button></form></section>;
}
