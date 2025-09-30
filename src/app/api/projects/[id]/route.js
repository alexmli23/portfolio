import dbConnect from "@/lib/dbConnect"
import Project from "@/lib/models/Project"

export async function GET(req, { params }){
    await dbConnect()
    const project = await Project.findById(params.id)
    if (!project){
        return new Response(JSON.stringify({ error: 'Not Found'}), { status: 404})
    }
    return Response.json(project)
}

export async function PUT(req, {params}){
    await dbConnect()
    const data = await req.json()
    const updated = await Project.findByIdAndUpdate(params.id, data, {new: true})
    if (!updated){
        return new Response(JSON.stringify({ error: 'Not Found'}), { status: 404})
    }
    return Response.json(updated)
}

export async function DELETE(req, {params}){
    await dbConnect()
    const deleted = await Project.findByIdAndDelete(params.id)
    if (!deleted){
        return new Response(JSON.stringify({ error: 'Not Found'}), {status: 404})
    }
    return Response.json( {sucesss: true})
}