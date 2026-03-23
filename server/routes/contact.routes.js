const { createContact, getAllProject, getAllSkills, getAbout, getExperience, getStat, sendReply } = require("../controller/contact.controller")

const routes = require("express").Router()

routes

    .post("/create-contact", createContact)
    .get("/get-project", getAllProject)
    .get("/get-skill", getAllSkills)
    .get("/get-about", getAbout)
    .get("/get-exp", getExperience)
    .get("/get-stat", getStat)
    .post("/send-reply/:uid", sendReply)



module.exports = routes    