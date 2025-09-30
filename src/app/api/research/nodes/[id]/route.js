import dbConnect from "@/lib/dbConnect";
import ResearchNode from "@/lib/models/ResearchNode";

export async function GET(req, { params }) {
  await dbConnect();
  const node = await ResearchNode.findById(params.id);
  if (!node) return new Response("Not found", { status: 404 });
  return Response.json(node);
}

export async function PUT(req, { params }) {
  await dbConnect();
  const body = await req.json();
  const updated = await ResearchNode.findByIdAndUpdate(params.id, body, { new: true });
  if (!updated) return new Response("Not found", { status: 404 });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await dbConnect();
  await ResearchNode.findByIdAndDelete(params.id);
  return new Response(null, { status: 204 });
}