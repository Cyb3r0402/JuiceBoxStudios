import game1 from "@/assets/images/game-1.png"
import game2 from "@/assets/images/game-2.png"
import game3 from "@/assets/images/game-3.png"

export type Game = {
  id: string
  title: string
  eyebrow: string
  tagline: string
  description: string
  status: string
  release: string
  genre: string
  platforms: string
  image: string
  accent: "ember" | "moss" | "gold"
  featured: boolean
  published: boolean
  features: string[]
}

const storageKey = "juice-box-games-v3"

export const seedGames: Game[] = [
  { id: "crown-of-ash", title: "Crown of Ash", eyebrow: "THE NEXT DESCENT", tagline: "A kingdom remembers every wound.", description: "A brutal action RPG about a fallen knight crossing a dying empire. Read the battlefield, carry the weight of every strike, and decide what kind of ruler survives the ashes.", status: "In development", release: "2027", genre: "Action RPG", platforms: "PC · PlayStation 5 · Xbox Series", image: game1, accent: "ember", featured: true, published: true, features: ["Deliberate, weighty combat", "A world built on consequence", "Bosses that remember your tactics"] },
  { id: "verdant-covenant", title: "Verdant Covenant", eyebrow: "THE FOREST AWAKENS", tagline: "Every root holds a promise.", description: "A living-world adventure set beneath an ancient canopy. Commune with spirits, uncover the old pact, and heal a forest that has begun to dream of war.", status: "Announced", release: "TBA", genre: "Open-world adventure", platforms: "PC · PlayStation 5", image: game2, accent: "moss", featured: true, published: true, features: ["A world that changes with the seasons", "Spirit-led exploration", "Environmental mysteries"] },
  { id: "the-hollow-throne", title: "The Hollow Throne", eyebrow: "A KINGDOM IN RUIN", tagline: "Rule what refuses to die.", description: "A gothic strategy game about rebuilding a shattered kingdom from absolute ruin. Command a legion of the dead, bargain with saints, and defend an obsidian throne.", status: "Announced", release: "TBA", genre: "Dark strategy", platforms: "PC", image: game3, accent: "gold", featured: false, published: true, features: ["Turn-based kingdom management", "Morality-free diplomacy", "A campaign shaped by loss"] },
]

function canUseStorage() { return typeof window !== "undefined" && typeof window.localStorage !== "undefined" }
export function getGames(): Game[] { if (!canUseStorage()) return seedGames; try { const raw = window.localStorage.getItem(storageKey); if (!raw) return seedGames; const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) ? parsed as Game[] : seedGames } catch { return seedGames } }
export function saveGames(games: Game[]) { if (canUseStorage()) window.localStorage.setItem(storageKey, JSON.stringify(games)) }
export function resetGames() { if (canUseStorage()) window.localStorage.removeItem(storageKey) }
export function getGame(id: string) { return getGames().find((game) => game.id === id) }
export function slugify(title: string) { return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
export function blankGame(): Game { return { ...seedGames[0], id: `new-${Date.now()}`, title: "New game", eyebrow: "NEW PROJECT", tagline: "A world waiting to be found.", description: "Write the first words of this world.", image: game1, featured: false, published: false } }
export const accentClasses = { ember: { text: "text-ember", border: "border-ember/40", bg: "bg-ember", soft: "bg-ember/10" }, moss: { text: "text-moss", border: "border-moss/40", bg: "bg-moss", soft: "bg-moss/10" }, gold: { text: "text-gold", border: "border-gold/40", bg: "bg-gold", soft: "bg-gold/10" } }
