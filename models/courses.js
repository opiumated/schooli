const mongoose = require("mongoose");

const { Schema } = mongoose;

const courseSchema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  bannerImage : { type: String, required: true },
  description: { type: String, required: true },
  _teachers : { type: Schema.Types.ObjectId, ref: "Teacher"},
  _studentsEnrolled : [ { type: Schema.Types.ObjectId, ref: "Student"}],
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date, default: Date.now },
  startDate: Date
});

module.exports = mongoose.model("Course", courseSchema);
