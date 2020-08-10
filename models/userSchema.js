var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  emailIp: String,
  nameIp: String,
  pwdIp: String,
  addIp: String,
  cityIp: String,
  cardIp: String,
  ExpIp: String,
});
const User = mongoose.model("users", userSchema);
module.exports = User;
