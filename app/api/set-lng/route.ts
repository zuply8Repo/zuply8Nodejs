import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lng } = await req.json();
  const res = NextResponse.json({ ok: true });
  res.cookies.set("lng", lng, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return res;
}
