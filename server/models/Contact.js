const mongoose = require("mongoose")

module.exports = mongoose.model("contct", new mongoose.Schema({
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true }))