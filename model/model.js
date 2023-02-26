const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  day: {
    type: Number,
  },
  present: {
    type: Number,
    required: [true, "Please enter count of students present"],
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
