"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminResearchGalleryPage() {
  const router = useRouter();

  // Password gate
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");

  // Topics state
  const [topics, setTopics] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // New topic form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth) fetchTopics();
  }, [auth]);

  const fetchTopics = async () => {
    const res = await fetch("/api/research", { cache: "no-store" });
    const data = await res.json();
    setTopics(data);
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

    const res = await fetch("/api/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        content,
        image: imageUrl,
      }),
    });

    if (res.ok) {
      setMessage("Topic created!");
      setShowForm(false);
      setTitle("");
      setDescription("");
      setContent("");
      setImageFile(null);
      fetchTopics();
    } else {
      setMessage("Error creating topic");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;
    const res = await fetch(`/api/research/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMessage("Topic deleted");
      fetchTopics();
    } else {
      setMessage("Error deleting topic");
    }
  };

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
      <h2 className="text-2xl font-bold mb-4">Research Topics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t._id}
            onClick={() => router.push(`/admin/research/${t._id}`)}
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
            <p className="text-sm mb-2">{t.description}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(t._id);
              }}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-600 mt-auto"
            >
              Delete
            </button>
          </div>
        ))}

        {/* New topic tile */}
        <button
          onClick={() => setShowForm(true)}
          className="p-4 bg-gray-100 rounded shadow flex flex-col items-center justify-center hover:bg-gray-200"
        >
          <span className="text-4xl">＋</span>
          <span className="mt-2 text-sm">Add New Topic</span>
        </button>
      </div>

      {/* Modal for creating topic */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full space-y-3">
            <h3 className="text-xl font-bold mb-2">Create New Topic</h3>
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
