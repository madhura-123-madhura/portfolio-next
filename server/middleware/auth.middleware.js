
const jwt = require("jsonwebtoken")
const { PRODUCTION } = require("../utils/config")

exports.adminProtected = async (req, res, next) => {
    try {
        // check for cookie
        const ADMIN = req.cookies.ADMIN//cookie name from auth.controller
        //     our variable
        if (!ADMIN) {
            return res.status(401).json({
                message: process.env.NODE_ENV === PRODUCTION
                    ? "unabel to authenticate"
                    : "NO COOKIE FOUND"
            })
        }
        // validate token
        jwt.verify(ADMIN, process.env.JWT_KEY, async (err, decode) => {// decode cotain
            if (err) {
                return res.status(401).json({ message: "ivalid toke" })
            }
            const result = await User.findById(decode._id)
            if (!result) {
                return res.status(401).json({ message: "invalid Id" })
            }
            if (result.role !== "admin") {
                return res.status(403).json({ message: "not authorized to access this route" })
            }


            next()
        })
        // validate is admin
    } catch (error) {
        console.log(error);

        res.status(401).json({ message: "unabel to authenticate" })
    }
}