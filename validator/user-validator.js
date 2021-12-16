/**
 * user 模块 validator
 * @author zhengzuo
 */
const { body } = require("express-validator")
const validate = require("../middleware/validator")
const User = require("../model/user")
const { md5 } = require("../util")

module.exports = {
  loginValidate: [
    validate([
      body("username").notEmpty().withMessage("用户名不能为空"),
      body("password").notEmpty().withMessage("密码不能为空"),
    ]),
    validate([
      // 验证用户名是否存在
      body("username").custom(async (username, { req }) => {
        const user = await User.findOne({
          attributes: ["username", "id", "password"],
          where: {
            username,
          },
        })
        if (!user) {
          return Promise.reject("用户名不存在")
        }

        // 根据用户名查找到用户挂在 req 对象上，便于后续使用
        req.user = user
      }),
    ]),
    validate([
      // 验证密码是否正确
      body("password").custom(async (pwd, { req }) => {
        if (md5(pwd) != req.user.password) {
          return Promise.reject("密码错误")
        }
      }),
    ]),
  ],
  registerValidate: [
    validate([
      body("username").notEmpty().withMessage("用户名不能为空"),
      body("email")
        .notEmpty()
        .withMessage("邮箱不能为空")
        .bail()
        .isEmail()
        .withMessage("邮箱不合法"),
      body("password").notEmpty().withMessage("密码不能为空"),
    ]),
    validate([
      body("username").custom(async (username) => {
        let user = await User.findOne({
          where: {
            username
          }
        })
        if(user) {
          return Promise.reject("用户名已经存在，不能重复申请")
        } 
      }),
      body("email").custom(async (email) => {
        let user = await User.findOne({
          where: {
            email
          }
        })
        if(user) {
          return Promise.reject("该邮箱已经注册过，不能重复注册")
        } 
      })
    ])
  ],
}
