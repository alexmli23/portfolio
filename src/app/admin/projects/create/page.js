"use client";

import { useEffect, useState } from "react";

export default function AdminCreateProjectPage() {
  // Password gate
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");

  // Project state
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // New project form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth) fetchProjects();
  }, [auth]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    setProjects(data);
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (imageFile) {
      imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(imageFile);
      });
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        image: imageUrl,
      }),
    });

    if (res.ok) {
      setMessage("Project created!");
      setShowForm(false);
      setTitle("");
      setDescription("");
      setContent("");
      setTags("");
      setImageFile(null);
      fetchProjects();
    } else {
      setMessage("Error creating project");
    }
  };

  // new delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMessage("Project deleted");
      fetchProjects();
    } else {
      setMessage("Error deleting project");
    }
  };

  // Password prompt
  if (!auth) {
    return (
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-xl font-bold mb-2">Admin Login</h2>
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Log in
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p._id}
            className="p-4 bg-white rounded shadow flex flex-col"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="text-sm mb-2">{p.description}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 mt-auto"
            >
              Delete
            </button>
          </div>
        ))}

        {/* New project tile */}
        <button
          onClick={() => setShowForm(true)}
          className="p-4 bg-gray-100 rounded shadow flex flex-col items-center justify-center hover:bg-gray-200"
        >
          <span className="text-4xl">＋</span>
          <span className="mt-2 text-sm">Add New Project</span>
        </button>
      </div>

      {/* Modal for creating project */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full space-y-3">
            <h3 className="text-xl font-bold mb-2">Create New Project</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <textarea
                className="border p-2 w-full"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <input
                className="border p-2 w-full"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded w-full"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 p-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
            {message && <p className="text-center">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
