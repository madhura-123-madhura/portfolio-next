require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { FRONTEND_URL } = require("./utils/config.js")


const app = express()

mongoose.connect(process.env.MONGO_ULR)
app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use("/api/auth", require("./routes/auth.router.js"))
app.use("/api/contact", require("./routes/contact.routes.js"))
app.use("/api/admin", require("./routes/admin.routes.js"))

mongoose.connection.once("open", () => {
    app.listen(app.listen(process.env.PORT, () => {
        console.log("server running..");
        console.log(`mode:${process.env.NODE_ENV}`);
        console.log(`CORS ALLOWED:${FRONTEND_URL}`);


    }))
})

module.exports = app