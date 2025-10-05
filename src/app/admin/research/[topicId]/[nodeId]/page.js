"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export default function MarkdownUploadPage() {
  const { nodeId } = useParams(); // ✅ get from route
  const [markdown, setMarkdown] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Please select a markdown file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nodeId", nodeId); // 👈 automatically include nodeId

    try {
      const res = await fetch("/api/research/uploadMarkdown", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { markdownUrl } = await res.json();
        const response = await fetch(markdownUrl);
        const text = await response.text();
        setMarkdown(text);
        setUploadStatus("✅ Uploaded successfully!");
      } else {
        setUploadStatus("❌ Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("❌ Upload failed (check console).");
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Upload Markdown for Node</h1>

      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-3"
      >
        <p className="text-gray-600 text-sm">Node ID: {nodeId}</p>

        <input
          type="file"
          accept=".md"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Upload Markdown
        </button>
      </form>

      {uploadStatus && <p className="mt-4 text-gray-700">{uploadStatus}</p>}

      {markdown && (
        <div className="mt-8 prose max-w-none bg-white p-4 rounded shadow-md">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {markdown}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

