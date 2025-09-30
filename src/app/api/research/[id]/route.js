import dbConnect from "@/lib/dbConnect"
import ResearchTopic from "@/lib/models/ResearchTopic"

export async function GET(req, { params }){
    await dbConnect()
    const topic = await ResearchTopic.findById(params.id)
    if (!topic){
        return new Response(JSON.stringify({ error: 'Not Found'}), { status: 404})
    }
    return Response.json(topic)
}

export async function PUT(req, {params}){
    await dbConnect()
    const data = await req.json()
    const updated = await ResearchTopic.findByIdAndUpdate(params.id, data, {new: true})
    if (!updated){
        return new Response(JSON.stringify({ error: 'Not Found'}), { status: 404})
    }
    return Response.json(updated)
}

export async function DELETE(req, {params}){
    await dbConnect()
    const deleted = await ResearchTopic.findByIdAndDelete(params.id)
    if (!deleted){
        return new Response(JSON.stringify({ error: 'Not Found'}), {status: 404})
    }
    return Response.json( {sucesss: true})
}