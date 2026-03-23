const Auth = require("../models/Auth")
const bycrypt = require("bcryptjs")
const crypto = require("crypto")
const { isEmail } = require("validator")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

const About = require("../models/About")
const { PRODUCTION } = require("../utils/config")
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({ message: "email and password required" })
        }
        if (!isEmail(email)) {
            return res.status(401).json({ message: "Invalied email" })
        }

        const result = await Auth.findOne({ email }) //we got the keys from the data base
        if (!result) {
            return res.status(401).json({
                message: process.env.NODE_ENV === "production"  //PRODUCTION="production"
                    ? "Invalid credential"
                    : "Email not found"

            })
        }

        const verify = await bycrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "Invalid credential"
                    : "Invalid password"

            })
        }

        const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
        if (result.role === "admin") {
            res.cookie("ADMIN", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === PRODUCTION,
                maxAge: 1000 * 60 * 60 * 24
            })
        }
        // const profileImg = await About.findOne({ profileImg })
        res.status(200).json({
            message: "login success", result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                password: result.password,
                profilePic: result.profilePic,
                role: result.role
            }
        })

    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "unabel to login" })
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("ADMIN")
        res.status(200).json({ message: "logout success" })
    } catch (error) {
        res.status(401).json({ message: "unabel to logout" })
    }
}
