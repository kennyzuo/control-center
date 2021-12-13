const { Model, DataTypes } = require("sequelize")
const sequelize = require("./index")

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    username: DataTypes.STRING(50),
    password: DataTypes.STRING(50),
    disabled: DataTypes.INTEGER,
    created_time: DataTypes.DATE,
    last_login_time: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "user",
    createdAt: false,
    updatedAt: false
  }
)

module.exports = User
