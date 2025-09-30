import dbConnect from "@/lib/dbConnect";
import ResearchNode from "@/lib/models/ResearchNode";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const topicId = searchParams.get("topicId");
  const nodes = await ResearchNode.find(topicId ? { topicId } : {});
  return Response.json(nodes); // must return JSON
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const node = await ResearchNode.create(body);
  return Response.json(node, { status: 201 });
}
