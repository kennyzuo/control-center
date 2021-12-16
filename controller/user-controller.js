const mockData = require("../mock/users.json")
const { sign, md5 } = require("../util")
const User = require("../model/user")

const userController = {
  async getUsers(req, res, next) {
    let users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "disabled",
        "createdAt",
        "updatedAt",
      ],
    })
    next({
      data: {
        users,
        userCount: users.length,
      },
    })
  },

  async login({ user }, res, next) {
    try {
      const token = await sign(
        {
          id: user.id,
        },
        "zhengzuo",
        {
          expiresIn: 60 * 60 * 24,
        }
      )

      next({
        code: 200,
        data: {
          token,
          user: {
            id: user.id,
            name: user.username,
          },
        },
      })
    } catch (err) {
      next(err)
    }
  },

  async getUser(req, res, next) {
    let id = req.params.id

    res.status(200).json({
      user: mockData.currentUser,
    })
  },

  async register(req, res, next) {
    let { username, email, password } = req.body
    try {
      let user = await User.create({
        username,
        email,
        password,
      })

      next({
        data: {
          id: user.id,
          username,
          password,
          email,
        },
      })
    } catch (err) {
      next(err)
    }
  },

  async updateUser(req, res, next) {
    const user = req.user
    const bodyUser = req.body.user
  },

  async changePassword(req, res, next) {
    try {
      const user = req.user
      const { oldPassword, password } = req.body

      if (oldPassword == password) {
        return next({
          data: "新老密码不能相同",
          msg: "error",
        })
      }

      if (md5(oldPassword) === user.password) {
        user.password = password
        await user.save()
        next({
          data: "密码修改成功",
        })
      } else {
        next({
          data: "输入的旧密码不正确",
          msg: "error",
        })
      }
    } catch (err) {
      next(err)
    }
  },

  async deleteUser(req, res, next) {
    try {
      let deleteUser = req.user
      await deleteUser.destroy()
      next({
        data: deleteUser,
        msg: "用户删除成功",
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = userController
