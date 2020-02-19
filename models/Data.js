const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  movie: {
    type: Array,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});
module.exports = Data = mongoose.model("data", UserSchema);