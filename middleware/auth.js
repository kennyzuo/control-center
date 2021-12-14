const { verify } = require("../util")
const mockData = require("../mock/users.json")

module.exports = async (req, res, next) => {
  let token = req.headers["authorization"]

  token = token ? token.split("Bearer ")[1] : ""

  if (!token) {
    return res.status(401).end()
  }

  try {
    const decodedToken = await verify(token, "zhengzuo")
    req.user = mockData.currentUser
    next()
  } catch (err) {
    return res.status(401).end()
  }
}
