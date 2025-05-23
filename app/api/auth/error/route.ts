import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Erro desconhecido de autenticação" }, { status: 400 });
}
