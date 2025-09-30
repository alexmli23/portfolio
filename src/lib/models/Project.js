import mongoose, { mongo } from "mongoose"

const ProjectSchema = new mongoose.Schema({
    title: { type:String, required: true},
    description: String,
    content: String,
    image: String,
    tags: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

export default mongoose.models.Project ||
    mongoose.model('Project', ProjectSchema)