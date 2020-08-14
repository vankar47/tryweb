var mongoose = require("mongoose");
var Joi = require("@hapi/joi");

var userSchema = mongoose.Schema({
  emailIp: String,
  nameIp: String,
  pwdIp: {
    type: String,
    required: [true, "Why no Password?"],
    minlength: [6, "Atleast 6 letters required!"],
  },
  addIp: String,
  cityIp: String,
  cardIp: String,
  ExpIp: String,
});
const User = mongoose.model("users", userSchema);

// function validateuser(data) {
//   const schema = Joi.object({
//     emailIp: Joi.email().required(),
//     nameIp: Joi.string().required(),
//     pwdIp: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
//     addIp: Joi.string().required(),
//     cityIp: Joi.string().required(),
//     cardIp: Joi.string().required(),
//     ExpIp: Joi.string().required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }

module.exports = User;
// module.exports.validateuser = validateuser;
