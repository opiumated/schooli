const mongoose = require("mongoose");

const { Schema } = mongoose;

var teacherSchema = new Schema({
  firstName : { type : String, required: true },
  lastName : { type : String, required: true },
  middleName : String,
  username: { type: String, required: true, unique: true, minlength: 8},
  password: { type: String, required: true, minlength: 8},
  email : { type: String, required: true, unique: true },
  nationality: { type: String, required: true },
  isDeleted : { type: Boolean, default: false },
  createdAt : {type: Date, default: Date.now },
  _courses : [{ type: Schema.Types.ObjectId, ref: "Course"}]
});

module.exports = mongoose.model("Teacher", teacherSchema);
