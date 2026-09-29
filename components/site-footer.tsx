import Link from "next/link";
import { Scissors } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__top"><Link className="brand brand--footer" href="/"><span className="brand__icon"><Scissors size={19} /></span><span>SHOW DE <b>BARBER</b><i>ESTILO QUE DEIXA MARCA</i></span></Link><p>O próximo grande corte começa<br />com uma boa escolha.</p></div><div className="site-footer__bottom"><span>© 2026 Show de Barber · Feito para quem leva estilo a sério.</span><div><Link href="/como-funciona">Sobre a plataforma</Link><Link href="/hall-da-fama">Hall da Fama</Link></div></div></footer>;
}
