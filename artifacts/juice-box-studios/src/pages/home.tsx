import { ArrowUpRight, ChevronDown, Compass, Menu, Play, Plus, Shield, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { accentClasses, getGames, type Game } from "@/lib/games";
import heroBg from "@/assets/images/hero-bg.png";

function GameCard({ game }: { game: Game }) {
  const accent = accentClasses[game.accent];
  return (
    <Link href={`/games/${game.id}`} className="group relative block overflow-hidden border border-line bg-panel">
      <div className="aspect-[16/10] overflow-hidden bg-ink">
        <img src={game.image} alt={`${game.title} key art`} className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>
      <div className="flex items-end justify-between gap-4 p-5">
        <div>
          <p className={`mb-2 text-[10px] font-bold tracking-[0.28em] ${accent.text}`}>{game.status.toUpperCase()}</p>
          <h3 className="font-display text-2xl tracking-wide">{game.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{game.genre} · {game.release}</p>
        </div>
        <span className="mb-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-line transition group-hover:border-parchment group-hover:bg-parchment group-hover:text-ink"><ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [games, setGames] = useState<Game[]>(getGames());
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => setGames(getGames().filter((game) => game.published)), []);
  const featured = games.find((game) => game.featured) ?? games[0];
  const closeMenu = () => setMenuOpen(false);
  return (
    <main className="min-h-screen bg-ink text-parchment">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-ink/20 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-3"><img src="/juice-box-logo.png" alt="Juice Box Studios" className="size-8 object-contain" /><span className="font-display text-sm tracking-[0.2em]">JUICE BOX</span></Link>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold tracking-[0.24em] text-parchment/70 md:flex"><a href="#games" className="transition hover:text-parchment">GAMES</a><a href="#studio" className="transition hover:text-parchment">STUDIO</a><Link href="/admin" className="transition hover:text-parchment">ADMIN</Link></nav>
          <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full border border-white/15 p-2 md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}><Menu size={18} /></button>
        </div>
        {menuOpen && <div className="border-t border-white/10 bg-ink/95 px-6 py-5 md:hidden"><nav className="flex flex-col gap-5 text-[11px] font-semibold tracking-[0.24em] text-parchment/80"><a href="#games" onClick={closeMenu}>GAMES</a><a href="#studio" onClick={closeMenu}>STUDIO</a><Link href="/admin" onClick={closeMenu}>ADMIN</Link></nav></div>}
      </header>

      <section className="relative flex min-h-[720px] items-end overflow-hidden border-b border-line lg:min-h-screen">
        <img src={heroBg} alt="Atmospheric game world" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28">
          <div className="max-w-3xl"><p className="mb-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.38em] text-ember"><span className="h-px w-10 bg-ember" />INDEPENDENT GAME STUDIO</p><h1 className="font-display text-6xl leading-[0.94] tracking-tight text-pretty md:text-8xl lg:text-9xl">WE MAKE<br /><span className="text-ember">WORLDS</span><br />WORTH REMEMBERING.</h1><p className="mt-8 max-w-xl text-base leading-7 text-parchment/65 md:text-lg">Juice Box Studios is an independent game studio building strange, beautiful worlds for players who go looking beyond the edge of the map.</p><div className="mt-10 flex flex-wrap gap-4"><a href="#games" className="inline-flex items-center gap-3 bg-parchment px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink transition hover:bg-ember hover:text-parchment">EXPLORE OUR GAMES <ArrowUpRight size={15} /></a><a href="#studio" className="inline-flex items-center gap-3 border border-parchment/30 px-6 py-3 text-xs font-bold tracking-[0.2em] transition hover:border-parchment">OUR STUDIO <ChevronDown size={15} /></a></div></div>
          <div className="mt-20 flex items-center gap-3 text-[10px] tracking-[0.25em] text-parchment/50"><span className="flex size-8 items-center justify-center rounded-full border border-parchment/20"><ChevronDown size={14} /></span> SCROLL TO DESCEND</div>
        </div>
      </section>

      <section id="games" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-36"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-4 text-[10px] font-bold tracking-[0.35em] text-ember">THE CATALOGUE</p><h2 className="font-display text-4xl tracking-wide md:text-6xl">OUR GAMES</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Stories in progress. Worlds with teeth. Every project begins with a question we cannot stop asking.</p></div>{featured && <Link href={`/games/${featured.id}`} className="group relative mb-16 block min-h-[420px] overflow-hidden border border-line"><img src={featured.image} alt={`${featured.title} featured art`} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" /><div className="relative flex min-h-[420px] max-w-xl flex-col justify-end p-7 md:p-12"><p className="mb-4 text-[10px] font-bold tracking-[0.3em] text-ember">FEATURED PROJECT · {featured.status.toUpperCase()}</p><h3 className="font-display text-5xl tracking-wide md:text-7xl">{featured.title}</h3><p className="mt-4 max-w-md text-sm leading-6 text-parchment/70">{featured.tagline}</p><span className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em]">VIEW GAME <ArrowUpRight size={15} /></span></div></Link>}
        {games.length ? <div className="grid gap-5 md:grid-cols-2">{games.map((game) => <GameCard key={game.id} game={game} />)}</div> : <div className="border border-line bg-panel p-8 text-sm text-muted-foreground">Our catalogue is being prepared. Check back soon for the next world.</div>}</section>

      <section id="studio" className="border-y border-line bg-panel/60"><div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr] lg:px-10 lg:py-36"><div><p className="mb-4 text-[10px] font-bold tracking-[0.35em] text-moss">THE STUDIO</p><h2 className="font-display text-4xl tracking-wide md:text-6xl">BUILT FROM<br />CURIOSITY.</h2></div><div><p className="max-w-2xl text-xl leading-9 text-parchment/75">We are a small, stubborn team of artists, designers, and engineers. We believe the best games are not assembled from checklists — they are discovered through obsession.</p><div className="mt-12 grid grid-cols-3 border-y border-line py-6"><div><p className="font-display text-3xl">03</p><p className="mt-2 text-[10px] tracking-[0.2em] text-muted-foreground">WORLDS IN MOTION</p></div><div><p className="font-display text-3xl">12</p><p className="mt-2 text-[10px] tracking-[0.2em] text-muted-foreground">CREATORS</p></div><div><p className="font-display text-3xl">∞</p><p className="mt-2 text-[10px] tracking-[0.2em] text-muted-foreground">QUESTIONS</p></div></div></div></div></section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-10"><div className="flex items-center gap-3"><img src="/juice-box-logo.png" alt="" className="size-6 object-contain opacity-60" /><span>© 2026 JUICE BOX STUDIOS</span></div><div className="flex gap-6 tracking-[0.16em]"><a href="mailto:juiceboxstudios999@gmail.com" className="hover:text-parchment">CONTACT</a><a href="https://discord.gg/hHdfWYGKW" target="_blank" rel="noreferrer" className="hover:text-parchment">DISCORD</a><Link href="/admin" className="hover:text-parchment">ADMIN</Link></div></footer>
    </main>
  );
}
