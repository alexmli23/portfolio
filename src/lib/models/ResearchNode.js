import mongoose from "mongoose";

const ResearchNodeSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchTopic", required: true },
  title: { type: String, required: true },
  content: String,  // blog content
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResearchNode" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ResearchNode ||
  mongoose.model("ResearchNode", ResearchNodeSchema);
