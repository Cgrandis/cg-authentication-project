import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from "file-type";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("photos");

    const uploaded: string[] = [];

    for (const file of files) {
      if (typeof (file as any)?.arrayBuffer === "function") {
        const blob = file as Blob;
        const bytes = await blob.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const type = await fileTypeFromBuffer(buffer);

        if (!type || !type.mime.startsWith("image/")) {
          return NextResponse.json(
            { error: "Arquivo inválido. Apenas imagens são permitidas." },
            { status: 400 }
          );
        }

        const extension = type.ext || "webp";
        const fileName = `${randomUUID()}.${extension}`;
        const filePath = path.join(process.cwd(), "public/uploads", fileName);

        await writeFile(filePath, buffer);
        uploaded.push(`/uploads/${fileName}`);
      }
    }

    return NextResponse.json({ urls: uploaded }, { status: 200 });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: "Erro ao processar upload" }, { status: 500 });
  }
}
