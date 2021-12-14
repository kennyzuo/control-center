/**
 * 全局错误统一处理中间件
 * @module middleware/error-handler
 * @author zhengzuo
 */

const util = require("util")

module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      error: '服务器出了点问题，请稍后再试', // util.format(err)
    })
  }
}
