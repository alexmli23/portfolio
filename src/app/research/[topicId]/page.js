"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import ProjectsNavbar from "@/app/components/ProjectsNavbar";

const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

export default function ResearchTopicPage() {
  const { topicId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [topic, setTopic] = useState(null); // store research topic

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
    if (!topicId) return;

    // fetch graph nodes
    fetchNodes();

    // fetch the topic itself
    fetch(`/api/research/${topicId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then(setTopic)
      .catch(console.error);
  }, [topicId]);

  const fetchNodes = async () => {
    const res = await fetch(`/api/research/nodes?topicId=${topicId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const graphNodes = data.map((n) => ({
        id: n._id,
        name: n.title,
        raw: n,
      }));
      const graphLinks = [];
      data.forEach((n) => {
        n.connections?.forEach((conn) => {
          graphLinks.push({ source: n._id, target: conn });
        });
      });
      setNodes(graphNodes);
      setLinks(graphLinks);
    }
  };

  const handleNodeClick = (node) => {
    const found = node.raw ?? nodes.find((n) => n.id === node.id)?.raw;
    if (found) setSelectedNode(found);
  };

  const graphData = useMemo(() => ({ nodes, links }), [nodes, links]);

  return (
    <div className="flex w-full h-screen">
      {/* Graph */}
      <div className="flex-[0.65] bg-gray-50">
        <ForceGraph2D
          ref={graphRef}
          width={dims.w * 0.65}
          height={dims.h}
          graphData={graphData}
          nodeLabel="name"
          nodeAutoColorBy="id"
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Details */}
      <div className="flex-[0.35] h-full bg-white/95 backdrop-blur p-6 overflow-y-auto shadow-lg">
        {selectedNode ? (
          <>
            <button
              className="bg-gray-300 p-2 rounded mb-2"
              onClick={() => setSelectedNode(null)}
            >
              Close
            </button>
            <h1 className="text-2xl font-bold mb-2">{selectedNode.title}</h1>

            {/* Show node image if it exists */}
            {selectedNode.image && (
              <img
                src={selectedNode.image}
                alt={selectedNode.title}
                className="w-full max-h-60 object-cover rounded mb-4"
              />
            )}

            <p className="mb-4 whitespace-pre-wrap">{selectedNode.content}</p>
            {selectedNode.connections?.length > 0 && (
              <div>
                <p className="font-semibold">Connected to:</p>
                <ul className="list-disc list-inside text-sm">
                  {nodes
                    .filter((n) => selectedNode.connections.includes(n.id))
                    .map((n) => (
                      <li key={n.id}>{n.name}</li>
                    ))}
                </ul>
              </div>
            )}
          </>
        ) : topic ? (
          <>
            <ProjectsNavbar />
            {/* Show research topic info when no node selected */}
            <h1 className="text-2xl font-bold mb-2 mt-10">{topic.title}</h1>

            {/* Show topic image */}
            {topic.image && (
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full max-h-60 object-cover rounded mb-4"
              />
            )}

            {topic.description && (
              <p className="mb-4 whitespace-pre-wrap">{topic.description}</p>
            )}
            {!topic.description && (
              <p className="text-gray-500">No description for this topic.</p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading topic…</p>
        )}
      </div>
    </div>
  );
}
