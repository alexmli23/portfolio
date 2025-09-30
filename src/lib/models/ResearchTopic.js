import mongoose from "mongoose"

const ResearchTopicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    content: String,
    image: String,
    edges: [{type: mongoose.Schema.Types.ObjectId, ref: "ResearchTopic"}],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type:Date, default: Date.now}
})

export default mongoose.models.ResearchTopic || 
    mongoose.model('ResearchTopic', ResearchTopicSchema)