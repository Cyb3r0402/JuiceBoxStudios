import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

async function isAdmin() { const session = await auth.api.getSession({ headers: await headers() }); return session?.user?.email?.toLowerCase() === "kalebmay18@gmail.com"; }
export async function GET() { const rows = await query("SELECT id, title, status, description, image, video_url AS \"videoUrl\", accent, cta FROM games ORDER BY sort_order, updated_at"); return NextResponse.json(rows); }
export async function PUT(request: Request) { if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const games = await request.json(); if (!Array.isArray(games)) return NextResponse.json({ error: "Invalid games" }, { status: 400 }); await query("DELETE FROM games"); for (const [index, game] of games.entries()) await query("INSERT INTO games (id,title,status,description,image,video_url,accent,cta,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [game.id, game.title, game.status, game.description, game.image, game.videoUrl || null, game.accent, game.cta, index]); return NextResponse.json({ ok: true }); }
