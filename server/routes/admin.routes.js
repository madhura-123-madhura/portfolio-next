const { CreateProject, getProject, updateProject, deleteProject, CreateExperiance, getExperiance, updateExperiance,
    deleteExperiance, CreateSkills, getSkills, updateSkills, deleteSkills, CreateState,
    getState,
    updateState,
    deleteState,
    CreateAbout,
    getAbout,
    updateAbout,
    deleteAbout,
    getAllContact,
    deleteContact } = require("../controller/admin.controller.js")

const routes = require("express").Router()

routes
    .post("/create-project", CreateProject)
    .get("/get-project", getProject)
    .put("/update-project/:pid", updateProject)
    .delete("/delete-project/:pid", deleteProject)

    // experience
    .post("/create-exp", CreateExperiance)
    .get("/get-exp", getExperiance)
    .put("/update-exp/:eid", updateExperiance)
    .delete("/delete-exp/:eid", deleteExperiance)

    //Skills
    .post("/create-skill", CreateSkills)
    .get("/get-skill", getSkills)
    .put("/update-skill/:sid", updateSkills)
    .delete("/delete-skill/:sid", deleteSkills)

    //statistics
    // .post("/create-stat", CreateState)
    .get("/get-stat", getState)
    .put("/update-stat/:sid", updateState)
    // .delete("/delete-stat/:sid", deleteState)

    // About
    .post("/create-about", CreateAbout)
    .get("/get-about", getAbout)
    .put("/update-about", updateAbout)
    .delete("/delete-about/:aid", deleteAbout)

    //contact
    .get("/get-contact", getAllContact)
    .delete("/delete-contact/:uid", deleteContact)
module.exports = routes