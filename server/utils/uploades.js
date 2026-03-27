const multer = require("multer")
const path = require("path")
const profileUpdate = multer({ storage: multer.diskStorage({}) }).single("profileImg")
const resumeUpdate = multer({ storage: multer.diskStorage({}) }).single("resume")

module.exports = { profileUpdate, resumeUpdate }