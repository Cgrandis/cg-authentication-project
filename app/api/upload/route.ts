import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("photos");

  const uploaded: string[] = [];

  for (const file of files) {
    if (file instanceof File) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${randomUUID()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);
      uploaded.push(`/uploads/${fileName}`);
    }
  }

  return NextResponse.json({ urls: uploaded }, { status: 200 });
}
