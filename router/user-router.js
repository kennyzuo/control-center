const express = require("express")
const {
  getUsers,
  login,
  register,
  deleteUser,
  changePassword,
} = require("../controller/user-controller.js")

const auth = require("../middleware/auth")

const {
  loginValidate,
  registerValidate,
  deleteValidate,
  changePasswordValidate,
} = require("../validator/user-validator")

const router = express.Router()

router.get("/", getUsers)

router.post("/login", loginValidate, login)

router.post("/register", registerValidate, register)

router.delete("/:id", deleteValidate, deleteUser)

router.put("/:id", changePasswordValidate, changePassword)

module.exports = router
