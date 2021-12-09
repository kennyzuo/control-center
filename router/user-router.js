const express = require("express")
const userController = require("../controller/user-controller.js")
const auth = require("../middleware/auth") 
// const userValidator = require("../validator/user")

const router = express.Router()

router.get('/', userController.getUsers)

router.post('/login', userController.login)

module.exports = router