
require("dotenv").config({ path: "./../.env" })
const mongoose = require("mongoose");
const About = require("../models/About");


exports.seedAbout = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_ULR)
        console.log("db connected");

        await About.create({
            name: "Madhura Gulwelkar",
            phone: "7843054577",
            title: "web devloper",
            email: "madhuragulwelkar75@gmail.com",
            dob: "12 Aug 2005",
            language: "Marathi,Hindi,English",
            currentWork: "Student",
            bio: "I am Madhura Gulwelkar, a BCS student and Full-Stack Developer passionate about building scalable web applications. With expertise in React, Next.js, and TypeScript, I focus on creating clean, type-safe code and efficient backends using MongoDB and Express. I love turning complex problems into simple, beautiful digital experiences.",
            journey: "nckBSDCISGU",
            location: "Ch. Sambhajinagara",
            profileImg: "",
            addResume: "",
        })


        console.log("About seed complete");
        process.exit(1)



    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}