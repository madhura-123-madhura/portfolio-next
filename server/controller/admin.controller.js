const About = require("../models/About")
const Contact = require("../models/Contact")
const Experiece = require("../models/Experiece")
const Project = require("../models/Project")
const Skill = require("../models/Skill")
const Statistics = require("../models/Statistics")

const cloud = require("./../utils/cloud")
const { sendEmail } = require("../utils/email");
const { contactTemplete } = require("../email-templets/contactTemplete");
const { profileUpdate, resumeUpdate } = require("../utils/uploades")

exports.CreateProject = async (req, res) => {
    try {
        const { title, desc, category, technologies, liveUrl, gitHubUrl } = req.body
        if (!title || !desc || !category || !technologies || !liveUrl || !gitHubUrl) {
            return res.status(400).json({ message: "all filds are required" })
        }
        await Project.create({ title, desc, category, technologies, liveUrl, gitHubUrl })
        res.status(200).json({ message: "create project success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to create project" })
    }
}
exports.getProject = async (req, res) => {
    try {
        const result = await Project.find()
        res.status(200).json({ message: "project get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get project" })
    }
}
exports.updateProject = async (req, res) => {
    try {
        const { title, desc, category, technologies, liveUrl, gitHubUrl } = req.body
        let obj = {}
        if (title) obj.title = title
        if (desc) obj.desc = desc
        if (category) obj.category = category
        if (technologies) obj.technologies = technologies
        if (liveUrl) obj.liveUrl = liveUrl
        if (gitHubUrl) obj.gitHubUrl = gitHubUrl
        const { pid } = req.params
        await Project.findByIdAndUpdate(pid, obj, { runValidators: true })
        res.status(200).json({ message: "project update success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to update project" })
    }
}
exports.deleteProject = async (req, res) => {
    try {
        const { pid } = req.params
        const result = await Project.findByIdAndDelete(pid)
        res.status(200).json({ message: "project delete success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to delete project" })
    }
}

// Experience

exports.CreateExperiance = async (req, res) => {
    try {
        await Experiece.create(req.body)
        res.status(200).json({ message: "create Skills success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to create project" })
    }
}
exports.getExperiance = async (req, res) => {
    try {
        const result = await Experiece.find()
        res.status(200).json({ message: "Skills get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get Skills" })
    }
}
exports.updateExperiance = async (req, res) => {
    try {
        const { eid } = req.params
        await Experiece.findByIdAndUpdate(eid, req.body, { runValidators: true })
        res.status(200).json({ message: "Skills update success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to update Skills" })
    }
}
exports.deleteExperiance = async (req, res) => {
    try {
        const { eid } = req.params
        const result = await Experiece.findByIdAndDelete(eid)
        res.status(200).json({ message: "Skills delete success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to delete Skills" })
    }
}

// Skills

exports.CreateSkills = async (req, res) => {
    try {
        await Skill.create(req.body)
        res.status(200).json({ message: "create Skills success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to create skill" })
    }
}
exports.getSkills = async (req, res) => {
    try {
        const result = await Skill.find()
        res.status(200).json({ message: "Skills get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get Skills" })
    }
}
exports.updateSkills = async (req, res) => {
    try {
        const { sid } = req.params
        await Skill.findByIdAndUpdate(sid, req.body, { runValidators: true })
        res.status(200).json({ message: "Skills update success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to update Skills" })
    }
}
exports.deleteSkills = async (req, res) => {
    try {
        const { sid } = req.params
        const result = await Skill.findByIdAndDelete(sid)
        res.status(200).json({ message: "Skills delete success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to delete Skills" })
    }
}

// statistics

// exports.CreateState = async (req, res) => {
//     try {
//         await Statistics.create(req.body)
//         res.status(200).json({ message: "create statestics success" })
//     } catch (error) {
//         res.status(401).json({ message: "unabel to create skill" })
//     }
// }
exports.getState = async (req, res) => {
    try {
        const result = await Statistics.findOne()
        res.status(200).json({ message: "statestics get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get statestics" })
    }
}
exports.updateState = async (req, res) => {
    try {
        const { sid } = req.params
        await Statistics.findByIdAndUpdate({ _id: sid }, req.body, { runValidators: true })
        res.status(200).json({ message: "statestics update success" })
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "unabel to update statestics" })
    }
}
// exports.deleteState = async (req, res) => {
//     try {
//         const { sid } = req.params
//         const result = await Statistics.findByIdAndDelete(sid)
//         res.status(200).json({ message: "statestics delete success", result })
//     } catch (error) {
//         res.status(401).json({ message: "unabel to delete statestics" })
//     }
// }

// About

exports.CreateAbout = async (req, res) => {
    try {




    } catch (error) {
        res.status(401).json({ message: "unabel to create About" })
    }
}
exports.getAbout = async (req, res) => {
    try {
        const result = await About.findOne()
        res.status(200).json({ message: "About get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get About" })
    }
}
exports.updateAbout = async (req, res) => {
    try {
        // profileUpdate(req, res, async err => {
        //     if (err) {
        //         console.log(err)
        //         return res.status(500).json({ message: err.message })
        //     }
        //     const result = await About.find()
        //     if (req.file) {

        //         const { secure_url } = await cloud.uploader.upload(req.file.path)
        //         await About.findByIdAndUpdate(result._id, { ...req.body, profileImg: secure_url })
        //         //                                                          👆 from models/Profile.js
        //         return res.status(200).json({ message: "profile update with image success" })
        //     } else {
        //         const result = await About.findOne()
        //         await About.findByIdAndUpdate(result._id, req.body)
        //         return res.status(200).json({ message: "profile update success" })
        //     }
        // })
        resumeUpdate(req, res, async err => {
            if (err) {
                console.log(err)
                return res.status(500).json({ message: err.message })
            }
            const result = await About.findOne()
            if (req.file) {
                const { secure_url } = await cloud.uploader.upload(req.file.path)
                await About.findByIdAndUpdate(result._id, { ...req.body, resume: secure_url })
                //                                                          👆 from models/Profile.js
                return res.status(200).json({ message: "resume update with image success" })
            } else {
                const result = await About.findOne()
                await About.findByIdAndUpdate(result._id, req.body)
                return res.status(200).json({ message: "resume update success" })
            }
        })
    } catch (error) {
        res.status(401).json({ message: "unabel to update About" })
    }
}
exports.deleteAbout = async (req, res) => {
    try {
        const { aid } = req.params
        const result = await About.findByIdAndDelete(aid)
        res.status(200).json({ message: "About delete success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to delete About" })
    }
}

//get All contacts

exports.getAllContact = async (req, res) => {
    try {

        const result = await Contact.find()
        res.status(200).json({ message: "contact read success", result })

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to read contact" })

    }
}


exports.deleteContact = async (req, res) => {
    try {
        const { uid } = req.params
        await Contact.findByIdAndDelete(uid)
        res.status(200).json({ message: "contact delete success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to delete contact" })

    }
}