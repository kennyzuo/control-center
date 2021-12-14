const express = require("express")
const userController = require("../controller/user-controller.js")
const auth = require("../middleware/auth")

const { loginValidate } = require("../validator/user-validator")

const router = express.Router()

router.get("/", userController.getUsers)

router.post("/login", loginValidate, userController.login)

module.exports = router
