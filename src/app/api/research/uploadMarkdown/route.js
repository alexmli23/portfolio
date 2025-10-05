import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "@/lib/dbConnect";
import ResearchNode from "@/lib/models/ResearchNode";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const nodeId = formData.get("nodeId"); // 👈 client must include this

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "markdown");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const markdownUrl = `/markdown/${fileName}`;

    // 👇 Save markdownUrl to the ResearchNode
    if (nodeId) {
      await dbConnect();
      await ResearchNode.findByIdAndUpdate(nodeId, { markdownUrl });
    }

    return Response.json({ markdownUrl });
  } catch (error) {
    console.error("Markdown upload failed:", error);
    return new Response("Failed to upload markdown", { status: 500 });
  }
}
