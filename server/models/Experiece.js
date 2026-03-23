const mongoose = require("mongoose")

module.exports = mongoose.model("experiance", new mongoose.Schema({
    Role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    desc: { type: String, required: true },
    risponsibility: { type: String, required: true },
}, { timestamps: true }))