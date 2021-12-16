const { Model, DataTypes } = require("sequelize")
const { md5 } = require("../util")
const sequelize = require("./index")

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING(50),
    password: {
      type: DataTypes.STRING(100),
      set(value) {
        this.setDataValue("password", md5(value))
      },
    },
    email: DataTypes.STRING(100),
    createdBy: DataTypes.UUID,
    updatedBy: DataTypes.UUID,
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "user",
  }
)

module.exports = User
