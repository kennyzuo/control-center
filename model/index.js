const Sequelize = require("sequelize")
const { db } = require("../config")
const { dencrypt } = require("../util")

const sequelize = new Sequelize(
  db.database,
  dencrypt(db.username),
  dencrypt(db.password),
  {
    host: db.host,
    dialect: "mysql"
  }
)

module.exports = sequelize
