"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(
  () => import("react-force-graph").then(mod => mod.ForceGraph2D),
  { ssr: false }
);

export default function AdminTopicGraphPage() {
  const { topicId } = useParams();

  const [allNodes, setAllNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // editor state for selected node
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [connections, setConnections] = useState([]);

  const [showNewNode, setShowNewNode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [message, setMessage] = useState("");

  const graphRef = useRef();
  const [dims, setDims] = useState({ w: 800, h: 600 });

  useEffect(() => {
    function handleResize() {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchNodes();
  }, [topicId]);

  const fetchNodes = async () => {
    const res = await fetch(`/api/research/nodes?topicId=${topicId}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setAllNodes(data);

      const allLinks = [];
      data.forEach((n) => {
        n.connections?.forEach((conn) => {
          allLinks.push({ source: n._id, target: conn });
        });
      });
      setLinks(allLinks);
    }
  };

  const handleNodeClick = (node) => {
    const n = allNodes.find((n) => n._id === node.id);
    if (n) {
      setSelectedNode(n);
      setTitle(n.title || "");
      setContent(n.content || "");
      setConnections(n.connections || []);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedNode(null); // close drawer when clicking empty space
    setShowNewNode(true);  // optionally show new-node modal
  };

  async function saveNode(e) {
    e.preventDefault();
    if (!selectedNode) return;
    const res = await fetch(`/api/research/nodes/${selectedNode._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        connections,
      }),
    });
    if (res.ok) {
      setMessage("Node saved!");
      setSelectedNode(null);
      fetchNodes();
    } else {
      setMessage("Error saving node");
    }
  }

  async function deleteNode() {
    if (!selectedNode) return;
    if (!confirm("Delete this node?")) return;
    const res = await fetch(`/api/research/nodes/${selectedNode._id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Node deleted");
      setSelectedNode(null);
      fetchNodes();
    } else {
      setMessage("Error deleting node");
    }
  }

  async function addNode(e) {
    e.preventDefault();
    await fetch("/api/research/nodes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, title: newTitle, content: newContent }),
    });
    setShowNewNode(false);
    setNewTitle("");
    setNewContent("");
    fetchNodes();
  }

  return (
    <div className="relative w-full h-screen">
      {/* Graph */}
      <div className="absolute inset-0 z-0">
        <ForceGraph2D
          ref={graphRef}
          width={dims.w}
          height={dims.h}
          graphData={{
            nodes: allNodes.map((n) => ({ id: n._id, name: n.title })),
            links,
          }}
          nodeLabel="name"
          nodeAutoColorBy="id"
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
        />
      </div>

      {/* Right-hand drawer editor (30-40% width) */}
      {selectedNode && (
        <div
          className="absolute top-0 right-0 z-10 h-full bg-white/95 backdrop-blur p-6 overflow-y-auto shadow-lg"
          style={{ width: "35%" }}
        >
          <h1 className="text-xl font-bold mb-2">Edit Node</h1>
          {connections.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold">Connected to:</p>
              <ul className="list-disc list-inside text-sm">
                {allNodes
                  .filter((n) => connections.includes(n._id))
                  .map((n) => (
                    <li key={n._id}>{n.title}</li>
                  ))}
              </ul>
            </div>
          )}

          <form onSubmit={saveNode} className="space-y-3">
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 w-full"
              rows={6}
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div>
              <p className="font-semibold mb-1">Connections (select nodes to link):</p>
              <div className="max-h-40 overflow-y-auto border p-2 rounded space-y-1 bg-white">
                {allNodes
                  .filter((n) => n._id !== selectedNode._id)
                  .map((n) => (
                    <label key={n._id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={connections.includes(n._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setConnections([...connections, n._id]);
                          } else {
                            setConnections(connections.filter((c) => c !== n._id));
                          }
                        }}
                      />
                      <span>{n.title}</span>
                    </label>
                  ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Save
              </button>
              <button
                type="button"
                onClick={deleteNode}
                className="bg-red-500 text-white p-2 rounded w-full"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="bg-gray-300 p-2 rounded w-full"
              >
                Close
              </button>
            </div>
          </form>
          {message && <p className="text-center">{message}</p>}
        </div>
      )}

      {/* Modal for creating new node */}
      {showNewNode && (
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
                  onClick={() => setShowNewNode(false)}
                  className="bg-gray-300 p-2 rounded w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
