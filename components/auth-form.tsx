"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const schema = z.object({ name: z.string().optional(), email: z.string().email("Digite um e-mail válido."), password: z.string().min(6, "Use pelo menos 6 caracteres.") });
type AuthValues = z.infer<typeof schema>;
export function AuthForm({ mode = "login" }: { mode?: "login" | "signup" }) {
  const creating = mode === "signup";
  const [notice, setNotice] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<AuthValues>({ resolver: zodResolver(schema) });
  const submit = (values: AuthValues) => setNotice(`Pronto, ${creating ? "cadastro" : "acesso"} simulado para ${values.email}. Nenhuma conta real foi criada.`);
  return <section className="auth-page"><div className="auth-art"><span className="eyebrow eyebrow--gold"><span className="eyebrow__line" /> SHOW DE BARBER</span><h2>Estilo bom é<br />estilo compartilhado.</h2><p>Encontre seu próximo lugar favorito. Ou seja esse lugar.</p></div><div className="auth-panel"><form className="auth-form" onSubmit={handleSubmit(submit)} noValidate><span className="eyebrow"><span className="eyebrow__line" /> SUA COMUNIDADE, DE UM JEITO NOVO</span><h1>{creating ? "Chega mais." : "Bom ter você de volta."}</h1><p>{creating ? "Crie sua conta e salve as barbearias que fazem seu estilo." : "Entre para acompanhar seus lugares e avaliações favoritos."}</p>{creating && <><label htmlFor="name">Seu nome</label><input id="name" autoComplete="name" placeholder="Como podemos te chamar?" {...register("name", { required: creating })} /></>}
    <label htmlFor="email">E-mail</label><input id="email" type="email" autoComplete="email" placeholder="voce@email.com" {...register("email")} />{errors.email && <span className="form-error">{errors.email.message}</span>}
    <label htmlFor="password">Senha</label><input id="password" type="password" autoComplete={creating ? "new-password" : "current-password"} placeholder="No mínimo 6 caracteres" {...register("password")} />{errors.password && <span className="form-error">{errors.password.message}</span>}
    <Button type="submit" className="w-full">{creating ? "Criar minha conta" : "Entrar"} <ArrowUpRight size={15} /></Button>
    <div className="auth-separator">ou continue com</div><div className="social-login"><button type="button" onClick={() => setNotice("Login Google simulado. A integração OAuth será conectada futuramente.")}>G  Google</button><button type="button" onClick={() => setNotice("Login por WhatsApp simulado. A confirmação será conectada futuramente.")}>◉  WhatsApp</button></div>
    {notice && <div className="auth-notice"><Mail size={13} /> {notice}</div>}<div className="auth-switch">{creating ? "Já tem uma conta? " : "Ainda não faz parte? "}<Link href={creating ? "/login" : "/cadastro"}>{creating ? "Entre por aqui" : "Criar conta"}</Link></div>
  </form></div></section>;
}
