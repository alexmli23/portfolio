import mongoose from "mongoose";

const ResearchNodeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "ResearchTopic" },
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "ResearchNode" }],
  markdownUrl: { type: String }, // 👈 add this
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ResearchNode ||
  mongoose.model("ResearchNode", ResearchNodeSchema);