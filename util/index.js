const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const { SECRET_KEY, IV } = require("../config")
const key = Buffer.from(SECRET_KEY, "utf8")
const iv = Buffer.from(IV, "utf8")

module.exports = {
  md5(str) {
    return crypto
      .createHash("md5")
      .update(SECRET_KEY + str)
      .digest("hex")
  },
  encrypt(str) {
    let cipher = crypto.createCipheriv("aes192", key, iv)
    cipher.update(str, "utf-8", "hex")
    return cipher.final("hex")
  },
  dencrypt(encrypt) {
    let decipher = crypto.createDecipheriv("aes192", key, iv)
    decipher.update(encrypt, "hex", "utf8")
    return decipher.final("utf8")
  },
  sign: promisify(jwt.sign),
  verify: promisify(jwt.verify),
  decode: promisify(jwt.decode),
}
