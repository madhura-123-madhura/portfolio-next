
const { contactTempleteGetReply, contactTemplete } = require("../email-templets/contactTemplete");
const About = require("../models/About");
const Contact = require("../models/Contact");
const Experiece = require("../models/Experiece");
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Statistics = require("../models/Statistics");
const { sendEmail } = require("../utils/email");



require('dotenv').config();

//contact
exports.createContact = async (req, res) => {
    try {
        const result = await Contact.create(req.body)
        if (result) {
            await sendEmail({
                email: process.env.EMAIL,
                subject: "Reply form portfolio contact",
                message: contactTempleteGetReply({ name: result.fullName, message: result.message }),
            })
            console.log("email send success");

        }

        res.status(200).json({ message: "contact create success", result })




    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel to create contact" })

    }
}
exports.sendReply = async (req, res) => {
    try {
        const { uid } = req.params
        const result = await Contact.findById(uid)
        if (result) {
            await sendEmail({
                email: result.email,
                subject: "Reply for the visitor",
                message: contactTemplete({ name: result.fullName }),
            })
        }

        res.status(200).json({ message: "reply send success success" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "unabel send reply" })

    }
}

// Project

exports.getAllProject = async (req, res) => {
    try {
        const result = await Project.find()
        res.status(200).json({ message: "project get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get project" })
    }
}

//skill

exports.getAllSkills = async (req, res) => {
    try {
        const result = await Skill.find()
        res.status(200).json({ message: "skill get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get skill" })
    }
}

//About

exports.getAbout = async (req, res) => {
    try {
        const result = await About.findOne()
        res.status(200).json({ message: "about get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get about" })
    }
}

// Experience

exports.getExperience = async (req, res) => {
    try {
        const result = await Experiece.find()
        res.status(200).json({ message: "experience get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get experience" })
    }
}

// statistics

exports.getStat = async (req, res) => {
    try {
        const result = await Statistics.find()
        res.status(200).json({ message: "statistics get success", result })
    } catch (error) {
        res.status(401).json({ message: "unabel to get statistics" })
    }
}