import dbConnect from "@/lib/dbConnect";
import Project from "@/lib/models/Project";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return NextResponse.json(projects);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const data = await req.json();
    const project = await Project.create({
      title: data.title,
      description: data.description,
      content: data.content,
      image: data.image, // ✅ accept photo URL
      tags: data.tags,
    });
    return NextResponse.json(project);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
