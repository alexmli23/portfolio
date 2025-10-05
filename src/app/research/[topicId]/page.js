"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import ProjectsNavbar from "@/app/components/ProjectsNavbar";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

export default function ResearchTopicPage() {
  const { topicId } = useParams();
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [topic, setTopic] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");

  const graphRef = useRef();
  const [dims, setDims] = useState({ w: 800, h: 600 });

  //Responsive resize
  useEffect(() => {
    const handleResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch topic + nodes
  useEffect(() => {
    if (!topicId) return;
    fetchTopic();
    fetchNodes();
  }, [topicId]);

  async function fetchTopic() {
    try {
      const res = await fetch(`/api/research/${topicId}`, { cache: "no-store" });
      if (res.ok) setTopic(await res.json());
    } catch (err) {
      console.error("Failed to fetch topic:", err);
    }
  }

  async function fetchNodes() {
    try {
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
    } catch (err) {
      console.error("Failed to fetch nodes:", err);
    }
  }

  //Load markdown when node is clicked
  const handleNodeClick = async (node) => {
    if (!node) return;
    const found = node.raw || nodes.find((n) => n.id === node.id)?.raw;
    if (!found) return;

    setSelectedNode(found);
    try {
      const res = await fetch(`/api/research/nodes/${found._id}`);
      if (res.ok) {
        const fullNode = await res.json();
        setMarkdownContent(fullNode.markdownContent || "");
      } else {
        setMarkdownContent("");
      }
    } catch (err) {
      console.error("Failed to fetch markdown content:", err);
      setMarkdownContent("");
    }
  };

  const graphData = useMemo(() => ({ nodes, links }), [nodes, links]);

  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-30 bg-gray-50/90 backdrop-blur-sm">
        <ProjectsNavbar />
      </div>

      {/* Graph + Sidebar container */}
      <div className="flex flex-row h-full pt-[4.5rem] md:pt-0">
        {/* Graph Section */}
        <div className="flex-1 relative">
          <ForceGraph2D
            ref={graphRef}
            width={dims.w}
            height={dims.h}
            graphData={graphData}
            nodeLabel="name"
            nodeAutoColorBy="id"
            onNodeClick={handleNodeClick}
            enableNodeDrag={false}
          />
        </div>

        {/*Desktop Sidebar - always visible */}
        <div
          className={`hidden md:flex flex-col fixed right-0 top-0 w-[35%] h-full bg-white/95 backdrop-blur-md p-6 overflow-y-auto shadow-lg border-l border-gray-200 z-40 transition-all duration-300 ease-in-out`}
        >
          <SidebarContent
            selectedNode={selectedNode}
            topic={topic}
            markdownContent={markdownContent}
            nodes={nodes}
          />
        </div>
      </div>

      {/* Mobile Popup */}
      {selectedNode && (
        <div className="md:hidden fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[90%] max-h-[80%] rounded-2xl shadow-2xl overflow-y-auto p-5 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
              onClick={() => {
                setSelectedNode(null);
                setMarkdownContent("");
              }}
            >
              ✕
            </button>
            <SidebarContent
              selectedNode={selectedNode}
              topic={topic}
              markdownContent={markdownContent}
              nodes={nodes}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ selectedNode, topic, markdownContent, nodes }) {
  const current = selectedNode || topic;
  if (!current) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-3">
        {current.title || "Untitled"}
      </h1>

      {current.image && (
        <img
          src={current.image}
          alt={current.title}
          className="w-full max-h-60 object-cover rounded mb-4"
        />
      )}

      {selectedNode && markdownContent ? (
        <div className="prose prose-sm max-w-none text-gray-800">
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {markdownContent}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="mb-4 whitespace-pre-wrap text-gray-700">
          {current.description || "No content available."}
        </p>
      )}

      {selectedNode?.connections?.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold mb-1">Connected to:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {nodes
              .filter((n) => selectedNode.connections.includes(n.id))
              .map((n) => (
                <li key={n.id}>{n.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
