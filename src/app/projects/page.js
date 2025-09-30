// src/app/projects/page.js
import ProjectsNavbar from "../components/ProjectsNavbar";

export default async function ProjectsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/projects`, { cache: "no-store" });
  const projects = await res.json();

  return (
    <div className="min-h-screen bg-white">
      {/* top nav */}
      <ProjectsNavbar />

      {/* header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-12 mb-8 text-center">
          Projects
        </h2>

        {/* gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <a
              key={p._id}
              href={`/projects/${p._id}`}
              className="group block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {p.image && (
                <div className="overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {p.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


