
require("dotenv").config({ path: "./../.env" })
const mongoose = require("mongoose");
const Auth = require("../models/Auth");
const bycrypt = require("bcryptjs")

exports.seedeAdmin = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_ULR)
        console.log("db connected");
        const result = await Auth.findOne({ role: "admin" })
        if (result) {
            console.log("admin is aldready present");
            process.exit(1)
        }
        const pass = await bycrypt.hash("123", 10)
        await Auth.create({
            name: "madhura",
            email: "madhuragulwelkar75@gmail.com",
            mobile: "7843064577",
            password: pass,
            profilePic: "",
            role: "admin",

        })
        console.log("admin seed complete");
        process.exit(1)

    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}