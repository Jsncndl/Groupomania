const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema= mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  userImage: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: String, required: false}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)