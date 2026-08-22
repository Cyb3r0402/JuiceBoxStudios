import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { query } from "@/lib/db";

const ADMIN_EMAIL = "kalebmay18@gmail.com";

async function isAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.email?.toLowerCase() === ADMIN_EMAIL;
}

const cleanUrl = (value: unknown) => {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
};

export async function GET() {
  const rows = await query("SELECT id, title, status, description, image, video_url AS \"videoUrl\", game_url AS \"gameUrl\", accent, cta FROM games ORDER BY sort_order, updated_at");
  return NextResponse.json(rows);
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const games = await request.json();
  if (!Array.isArray(games)) return NextResponse.json({ error: "Invalid games" }, { status: 400 });

  await query("DELETE FROM games");
  for (const [index, game] of games.entries()) {
    await query(
      "INSERT INTO games (id,title,status,description,image,video_url,game_url,accent,cta,sort_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [game.id, String(game.title ?? "").trim(), String(game.status ?? "Now Forging"), String(game.description ?? ""), typeof game.image === "string" ? game.image : null, cleanUrl(game.videoUrl), cleanUrl(game.gameUrl), String(game.accent ?? "primary"), String(game.cta ?? "Enter the Realm"), index],
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const result = await query<{ id: string }>(
    "DELETE FROM media_files m WHERE NOT EXISTS (SELECT 1 FROM games g WHERE g.image = m.id OR g.image = m.data) RETURNING m.id",
  );
  return NextResponse.json({ ok: true, purged: result.length });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body?.id || !body?.filename || !body?.mimeType || !body?.data) return NextResponse.json({ error: "Invalid media" }, { status: 400 });
  await query("INSERT INTO media_files (id, game_id, filename, mime_type, data) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO UPDATE SET filename=$3, mime_type=$4, data=$5", [body.id, body.gameId ?? null, body.filename, body.mimeType, body.data]);
  return NextResponse.json({ id: body.id, src: body.data });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body?.id) return NextResponse.json({ error: "Missing media id" }, { status: 400 });
  const rows = await query<{ data: string }>("SELECT data FROM media_files WHERE id = $1", [body.id]);
  return rows[0] ? NextResponse.json({ src: rows[0].data }) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
