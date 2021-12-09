const mockData = require("../mock/users.json")
const jwt = require("../util/jwt")

const userController = {
  async getUsers(req, res, next) {
    console.log("get users")
    res.status(200).json({
      users: mockData.users,
      userCount: mockData.users.length,
    })
  },

  async login(req, res, next) {
    try {
      const user = mockData.currentUser
      const token = await jwt.sign(user, "zhengzuo", {
        expiresIn: 60 * 60 * 24,
      })

      res.status(200).json({
        ...user,
        token,
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
