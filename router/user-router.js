const express = require("express")
const userController = require("../controller/user-controller.js")
const auth = require("../middleware/auth")

const { loginValidate, registerValidate } = require("../validator/user-validator")

const router = express.Router()

router.get("/", userController.getUsers)

router.post("/login", loginValidate, userController.login)

router.post("/register", registerValidate, userController.register)

module.exports = router
