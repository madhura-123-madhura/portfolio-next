const mongoose = require("mongoose")

module.exports = mongoose.model("about", new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    journey: { type: String, required: true },
    currentWork: { type: String, required: true },
    dob: { type: Date, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, required: true },
    profileImg: { type: String, required: true },
}, { timestamps: true }))