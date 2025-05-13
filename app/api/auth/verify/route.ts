import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
  if (!token) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      name: string;
      email: string;
      role: string;
    };

    return NextResponse.json(decoded, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
