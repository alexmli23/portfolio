import dbConnect from "@/lib/dbConnect";
import ResearchNode from "@/lib/models/ResearchNode";
import fs from "fs/promises";
import path from "path";

export async function GET(req, { params }) {
  await dbConnect();
  const node = await ResearchNode.findById(params.id);
  if (!node) return new Response("Not found", { status: 404 });

  let markdownContent = "";
  if (node.markdownUrl) {
    try {
      const filePath = path.join(process.cwd(), "public", node.markdownUrl);
      markdownContent = await fs.readFile(filePath, "utf-8");
    } catch (err) {
      console.error("Markdown file not found:", err);
    }
  }

  return Response.json({ ...node.toObject(), markdownContent });
}
