const { login, logout } = require("../controller/auth.controller")

const routes = require("express").Router()

routes
    .post("/login", login)
    .post("/logout", logout)


module.exports = routes    