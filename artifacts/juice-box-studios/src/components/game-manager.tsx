import { useEffect, useMemo, useRef, useState } from "react";
import { Edit3, ExternalLink, ImagePlus, Plus, Save, Trash2, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Accent = "primary" | "secondary" | "accent";
export type Game = { id: string; title: string; status: string; description: string; image: string; videoUrl: string; accent: Accent; cta: string };
const STORAGE_KEY = "juice-box-studios-games-v1";
const emptyGame: Omit<Game, "id"> = { title: "", status: "Now Forging", description: "", image: "", videoUrl: "", accent: "primary", cta: "Enter the Realm" };

function readGames(fallback: Game[]) { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as Game[] : fallback; } catch { return fallback; } }
function videoHref(url: string) { if (!url) return ""; try { const parsed = new URL(url); return ["http:", "https:"].includes(parsed.protocol) ? parsed.toString() : ""; } catch { return ""; } }

export function GameManager({ defaults }: { defaults: Game[] }) {
  const [games, setGames] = useState(defaults);
  const [hydrated, setHydrated] = useState(false);
  const [editing, setEditing] = useState<Game | null>(null);
  const [draft, setDraft] = useState<Omit<Game, "id">>(emptyGame);
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setGames(readGames(defaults)); setHydrated(true); }, [defaults]);
  useEffect(() => { if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(games)); }, [games, hydrated]);
  const accentClasses = useMemo(() => ({ primary: "text-primary", secondary: "text-secondary", accent: "text-accent" }), []);
  const startAdd = () => { setEditing(null); setDraft(emptyGame); setOpen(true); };
  const startEdit = (game: Game) => { setEditing(game); setDraft({ ...game }); setOpen(true); };
  const update = (key: keyof typeof draft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const save = () => { if (!draft.title.trim() || !draft.description.trim()) return; const next = { ...draft, title: draft.title.trim(), id: editing?.id ?? crypto.randomUUID() }; setGames((current) => editing ? current.map((game) => game.id === editing.id ? next as Game : game) : [...current, next as Game]); setOpen(false); };
  const remove = (id: string) => { if (window.confirm("Remove this realm from the site?")) setGames((current) => current.filter((game) => game.id !== id)); };
  const move = (index: number, direction: -1 | 1) => setGames((current) => { const copy = [...current]; [copy[index], copy[index + direction]] = [copy[index + direction], copy[index]]; return copy; });
  const pickImage = (file?: File) => { if (!file || !file.type.startsWith("image/")) return; const reader = new FileReader(); reader.onload = () => update("image", String(reader.result)); reader.readAsDataURL(file); };
  const reset = () => { if (window.confirm("Reset all realms to the original site content?")) setGames(defaults); };

  return <>
    <div className="mb-10 flex flex-col items-center justify-between gap-4 border border-primary/20 bg-card/60 p-5 text-left sm:flex-row">
      <div><p className="font-bold uppercase tracking-widest text-primary">Realm archive</p><p className="text-sm text-muted-foreground">Manage games, artwork, and trailer links in this browser.</p></div>
      <Button onClick={startAdd} className="rounded-sm bg-primary font-bold uppercase tracking-widest"><Plus data-icon="inline-start" /> Add game</Button>
    </div>
    <div className="space-y-32">
      {games.length === 0 && <div className="border border-dashed border-white/20 p-12 text-center text-muted-foreground">No realms listed. Add your first game above.</div>}
      {games.map((game, index) => <article key={game.id} className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className={`relative group ${index % 2 ? "order-1 lg:order-2" : ""}`}><div className={`absolute -inset-4 bg-${game.accent}/20 blur-2xl rounded-[2rem]`} />{game.image ? <img src={game.image} alt={game.title} className="relative z-10 aspect-video w-full rounded-sm border border-white/10 object-cover shadow-2xl" /> : <div className="relative z-10 flex aspect-video items-center justify-center border border-dashed border-white/20 bg-card text-muted-foreground">No artwork</div>}</div>
        <div className={`flex flex-col gap-6 ${index % 2 ? "order-2 lg:order-1 lg:pr-12" : "lg:pl-12"}`}><div className={`flex items-center gap-2 font-bold uppercase tracking-widest ${accentClasses[game.accent]}`}>{game.status}</div><h3 className="cinzel text-4xl font-black tracking-tighter sm:text-5xl">{game.title.toUpperCase()}</h3><p className="text-lg leading-relaxed text-muted-foreground">{game.description}</p><div className="flex flex-wrap gap-3"><Button className={`rounded-sm bg-${game.accent} font-bold uppercase tracking-widest`}>{game.cta}</Button>{videoHref(game.videoUrl) && <Button asChild variant="outline" className="rounded-sm border-primary/50 uppercase"><a href={videoHref(game.videoUrl)} target="_blank" rel="noreferrer"><Video data-icon="inline-start" /> Trailer <ExternalLink data-icon="inline-end" /></a></Button>}</div><div className="flex flex-wrap gap-2 border-t border-white/10 pt-4"><Button size="sm" variant="outline" onClick={() => startEdit(game)}><Edit3 data-icon="inline-start" /> Edit</Button><Button size="sm" variant="outline" disabled={index === 0} onClick={() => move(index, -1)}>Move up</Button><Button size="sm" variant="outline" disabled={index === games.length - 1} onClick={() => move(index, 1)}>Move down</Button><Button size="sm" variant="destructive" onClick={() => remove(game.id)}><Trash2 data-icon="inline-start" /> Remove</Button></div></div>
      </article>)}
    </div>
    <div className="mt-16 flex flex-wrap justify-center gap-3"><Button variant="ghost" onClick={reset}>Reset original realms</Button><span className="self-center text-sm text-muted-foreground">Changes save only in this browser.</span></div>
    {open && <div role="dialog" aria-modal="true" aria-labelledby="game-editor-title" className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-primary/40 bg-card p-6 shadow-2xl"><div className="mb-6 flex items-center justify-between"><div><h2 id="game-editor-title" className="cinzel text-2xl font-bold">{editing ? "Edit realm" : "Add realm"}</h2><p className="text-sm text-muted-foreground">Update what visitors see in Our Realms.</p></div><Button variant="ghost" size="icon" aria-label="Close editor" onClick={() => setOpen(false)}><X /></Button></div><div className="grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm font-bold">Title<Input value={draft.title} onChange={(e) => update("title", e.target.value)} placeholder="Game title" /></label><label className="flex flex-col gap-2 text-sm font-bold">Status<Input value={draft.status} onChange={(e) => update("status", e.target.value)} placeholder="Now forging" /></label><label className="flex flex-col gap-2 text-sm font-bold sm:col-span-2">Description<Textarea value={draft.description} onChange={(e) => update("description", e.target.value)} rows={4} placeholder="Describe the realm" /></label><label className="flex flex-col gap-2 text-sm font-bold">Button label<Input value={draft.cta} onChange={(e) => update("cta", e.target.value)} /></label><label className="flex flex-col gap-2 text-sm font-bold">Video URL<Input type="url" value={draft.videoUrl} onChange={(e) => update("videoUrl", e.target.value)} placeholder="https://youtube.com/..." /></label><div className="flex flex-col gap-2 text-sm font-bold sm:col-span-2"><span>Artwork</span><div className="flex flex-wrap items-center gap-3">{draft.image && <img src={draft.image} alt="Artwork preview" className="size-20 rounded-sm object-cover" />}<Button type="button" variant="outline" onClick={() => fileRef.current?.click()}><ImagePlus data-icon="inline-start" /> Choose image</Button>{draft.image && <Button type="button" variant="ghost" onClick={() => update("image", "")}>Remove image</Button>}<input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => pickImage(e.target.files?.[0])} /></div></div><label className="flex flex-col gap-2 text-sm font-bold">Accent<select className="h-10 rounded-sm border border-input bg-background px-3" value={draft.accent} onChange={(e) => update("accent", e.target.value as Accent)}><option value="primary">Violet</option><option value="secondary">Green</option><option value="accent">Gold</option></select></label></div><div className="mt-6 flex justify-end gap-3"><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save} disabled={!draft.title.trim() || !draft.description.trim()}><Save data-icon="inline-start" /> Save realm</Button></div></div></div>}
  </>;
}

export type { Accent };
export { STORAGE_KEY };
export default GameManager;
