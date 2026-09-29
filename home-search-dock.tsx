"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock3, MapPin, Search, ShieldCheck, TrendingUp } from "lucide-react";

const RECENT_KEY = "show-de-barber:recent-searches";
const popularSearches = ["Fade", "Pinheiros, São Paulo", "Barba completa", "Rio de Janeiro"];

export function HomeSearchDock({ badgeOnly, onBadgeChange }: { badgeOnly: boolean; onBadgeChange: (value: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const openSuggestions = () => {
    try { setRecentSearches(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]").slice(0, 3)); } catch { setRecentSearches([]); }
    setIsOpen(true);
  };
  const search = (value = query) => {
    const clean = value.trim();
    if (clean) {
      const next = [clean, ...recentSearches.filter((item) => item.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      setRecentSearches(next);
    }
    setIsOpen(false);
    router.push(`/busca?q=${encodeURIComponent(clean)}${badgeOnly ? "&badge=1" : ""}`);
  };
  const suggestions = query.trim() ? popularSearches.filter((item) => item.toLowerCase().includes(query.toLowerCase())) : popularSearches;
  return <div className="search-dock page-shell">
    <form className="search-dock__main" onSubmit={(event) => { event.preventDefault(); search(); }}>
      <MapPin size={18} />
      <label htmlFor="search-place"><span>ONDE</span><input id="search-place" value={query} onChange={(event) => setQuery(event.target.value)} onFocus={openSuggestions} placeholder="Bairro, cidade ou especialidade" autoComplete="off" /></label>
      <button type="submit" aria-label="Pesquisar" className="search-dock__button"><Search size={19} /><span>Encontrar meu corte</span></button>
    </form>
    {isOpen && <div className="search-suggestions"><div className="search-suggestions__heading">{recentSearches.length > 0 && !query ? "BUSCAS RECENTES" : "SUGESTÕES POPULARES"}</div>{!query && recentSearches.map((item) => <button type="button" key={`recent-${item}`} onMouseDown={(event) => event.preventDefault()} onClick={() => search(item)}><Clock3 size={14} /><span>{item}</span></button>)}{suggestions.map((item) => <button type="button" key={item} onMouseDown={(event) => event.preventDefault()} onClick={() => search(item)}><TrendingUp size={14} /><span>{item}</span></button>)}{suggestions.length === 0 && <span className="search-suggestions__empty">Pressione Enter para buscar “{query}”.</span>}<button type="button" className="search-suggestions__close" onClick={() => setIsOpen(false)}>Fechar sugestões</button></div>}
    <button type="button" onClick={() => onBadgeChange(!badgeOnly)} className={`search-dock__badge ${badgeOnly ? "is-selected" : ""}`} aria-pressed={badgeOnly}><span className="badge-orbit"><ShieldCheck size={15} /></span><span><b>Só Badge of Honour</b><small>Excelência comprovada</small></span><span className="switch"><i /></span></button>
  </div>;
}
