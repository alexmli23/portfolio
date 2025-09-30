"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// 2D only graph – no AFrame
const ForceGraph2D = dynamic(
  () => import("react-force-graph").then(mod => mod.ForceGraph2D),
  { ssr: false }
);

export default function AdminTopicGraphPage() {
  const { topicId } = useParams();
  const router = useRouter();

  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [message, setMessage] = useState("");

  const graphRef = useRef();

  useEffect(() => {
    fetchNodes();
  }, [topicId]);

  const fetchNodes = async () => {
    const res = await fetch(`/api/research/nodes?topicId=${topicId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setNodes(data);

    // build link array from node.connections
    const allLinks = [];
    data.forEach((n) => {
      n.connections?.forEach((conn) => {
        allLinks.push({ source: n._id, target: conn });
      });
    });
    setLinks(allLinks);
  };

  const handleNodeClick = (node) => {
    router.push(`/admin/research/${topicId}/${node._id}`);
  };

  const handleBackgroundClick = () => {
    setShowForm(true);
  };

  async function addNode(e) {
    e.preventDefault();
    await fetch("/api/research/nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, title: newTitle, content: newContent }),
    });
    setShowForm(false);
    setNewTitle("");
    setNewContent("");
    fetchNodes();
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Graph for Topic</h2>

      <div
        className="border rounded overflow-hidden"
        style={{ width: "100%", height: "500px" }}
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={{
            nodes: nodes.map((n) => ({ id: n._id, name: n.title })),
            links,
          }}
          nodeLabel="name"
          nodeAutoColorBy="id"
          onNodeClick={(node) => router.push(`/admin/research/${topicId}/${node.id}`)}
          onBackgroundClick={handleBackgroundClick}
        />
      </div>

      {/* Modal for creating node */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full space-y-3">
            <h3 className="text-xl font-bold mb-2">Create New Node</h3>
            <form onSubmit={addNode} className="space-y-3">
              <input
                className="border p-2 w-full"
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="border p-2 w-full"
                rows={4}
                placeholder="Content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
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
