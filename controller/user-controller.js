const mockData = require("../mock/users.json")
const { sign } = require("../util")
const User = require("../model/user")

const userController = {
  async getUsers(req, res, next) {
    let users = await User.findAll()
    next({
      data: {
        users,
        userCount: users.length,
      },
    })
  },

  async login({ user }, res, next) {
    try {
      const token = await sign({
        id: user.id
      }, "zhengzuo", {
        expiresIn: 60 * 60 * 24,
      })

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

  async addUser(req, res, next) {
    const user = req.body.user
    res.status(201).json({
      user,
    })
  },

  async updateUser(req, res, next) {
    const user = req.user
    const bodyUser = req.body.user

    res.status(201).json({
      user: mockData.currentUser,
    })
  },
}

module.exports = userController
