"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectsNavbar from "../components/ProjectsNavbar";

export default function ResearchGalleryPage() {
  const router = useRouter();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const res = await fetch("/api/research", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setTopics(data);
    }
  };

  return (
    <div className="p-4">
        <div>
            <ProjectsNavbar />
        </div>
      <h2 className="text-2xl font-bold mb-4 mt-10 ml-6">Research Topics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t._id}
            onClick={() => router.push(`/research/${t._id}`)}
            className="p-4 bg-white rounded shadow flex flex-col cursor-pointer hover:shadow-md"
          >
            {t.image && (
              <img
                src={t.image}
                alt={t.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{t.title}</h3>
            <p className="text-sm">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
