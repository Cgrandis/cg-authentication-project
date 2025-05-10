import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];
  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ status: "authorized" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
