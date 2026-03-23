const mongoose = require("mongoose")

module.exports = mongoose.model("statistics", new mongoose.Schema({
    expYear: { type: String, required: true },
    noOfProject: { type: String, required: true },
    tech: { type: String, required: true },
    happyClient: { type: String, required: true },
}, { timestamps: true }))