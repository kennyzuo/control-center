const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const router = require("./router")
const errorHandler = require("./middleware/error-handler")

const app = express()

// cors 跨域中间件
app.use(cors())

// morgan 日志中间件
app.use(morgan('dev'))

// express 内置中间件，基于 bodyparser ，用来处理带有 JSON 格式 payload 的请求
app.use(express.json())

// 路由挂载
app.use('/api', router)

// 全局错误处理中间件
app.use(errorHandler())

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`)
})
