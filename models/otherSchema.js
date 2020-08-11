var mongoose = require("mongoose");

var otherSchema = mongoose.Schema({
  image: String,
  title: String,
  by: String,
  price: Number,
  quantity: Number,
  rating: Number,
});
const other = mongoose.model("others", otherSchema);
module.exports = other;
