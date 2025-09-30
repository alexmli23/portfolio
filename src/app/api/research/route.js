import dbConnect from "@/lib/dbConnect";
import ResearchTopic from "@/lib/models/ResearchTopic";

export async function GET() {
    await dbConnect()
    const topics = await ResearchTopic.find({})
    return Response.json(topics)
}

export async function POST(req) {
    await dbConnect()
    const data = await req.json()
    const researchTopic = await ResearchTopic.create(data)
    return Response.json(researchTopic)
}