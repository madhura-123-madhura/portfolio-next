const mongoose = require("mongoose")

module.exports = mongoose.model("project", new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    technologies: { type: String, required: true },
    liveUrl: { type: String, required: true },
    gitHubUrl: { type: String, required: true },
}, { timestamps: true }))