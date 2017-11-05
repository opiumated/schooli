const mongoose = require("mongoose");

const { Schema } = mongoose;

var StudentSchema = new Schema({
  firstName : { type: String, required: true },
  middleName: { type: String, required: false },
  lastName : { type: String, required: true },
  avatar_url : String,
  email : { type: String , required: true, lowercase: true, unique : true},
  username : { type: String, required: true, unique: true },
  phoneNumber: Number,
  nationality: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date}
});

module.exports = mongoose.model("Student", StudentSchema);
