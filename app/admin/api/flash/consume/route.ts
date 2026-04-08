import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const store = await cookies();
  store.delete("admin_flash");
  return NextResponse.json({ ok: true });
}
