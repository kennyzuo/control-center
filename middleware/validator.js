/**
 * 请求参数 validator 中间件
 * @author zhengzuo
 */

const { validationResult } = require("express-validator")

module.exports = (rules) => {
  return async (req, res, next) => {
    await Promise.all(
      rules.map((rule) => {
        return rule.run(req)
      })
    )
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}
