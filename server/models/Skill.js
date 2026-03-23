// add skill update ,delete
//send email to user and user will send email back
// admin-seeder
//login for admin only
//crud for admin only
//resum send on profile  
const mongoose = require("mongoose")

module.exports = mongoose.model("skill", new mongoose.Schema({
    skillName: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, default: false },

}, { timestamps: true }))