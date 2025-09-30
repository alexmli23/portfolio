// src/app/projects/[id]/page.js
import dbConnect from "@/lib/dbConnect";
import Project from "@/lib/models/Project";
import ProjectsNavbar from "@/app/components/ProjectsNavbar";

export default async function ProjectPage({ params }) {
  await dbConnect();
  const project = await Project.findById(params.id).lean();

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectsNavbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        {/* Date + Tags */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-2">
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
          {project.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Image */}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-md mb-6"
          />
        )}

        {/* Description */}
        {project.description && (
          <p className="text-lg text-gray-700 mb-6">{project.description}</p>
        )}

        {/* Content */}
        {project.content && (
          <article className="prose prose-gray max-w-none">
            {project.content}
          </article>
        )}
      </main>
    </div>
  );
}
