const Attendance = require("../model/model");
const path = require("path");

// exports.renderPage = async (req, res, next) => {
//   try {
//     res.sendFile(`D:/super_dream_fit/attendence-predictor/index.html`);
//   } catch (err) {
//     console.log(err);
//     return res.send("Unable to fetch file");
//   }
// };

exports.addAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);
    attendanceArray = await Attendance.find();
    attendance["day"] = attendanceArray.length;
    console.log(attendance);
    return res.status(201).json({
      created: "success",
      data: attendance,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      console.log(req.body);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

exports.viewAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find();

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.predictAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find();
    let attendanceLog = [];
    let dailyLog = [];
    for (let i = 0; i < attendance.length; i++) {
      dailyLog.push(i + 1);
      attendanceLog.push(attendance[i].present);
    }

    let predictedVal = await predict(attendanceLog, dailyLog);
    console.log(predictedVal);

    return res.status(200).json({
      success: true,
      totalDays: attendance.length,
      today: attendance.length + 1,
      predicted: predictedVal,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

function predict(attendanceLog, dailyLog) {
  // Calculate Sums
  var xSum = 0,
    ySum = 0,
    xxSum = 0,
    xySum = 0;
  var count = dailyLog.length;
  for (var i = 0, len = count; i < count; i++) {
    xSum += dailyLog[i];
    ySum += attendanceLog[i];
    xxSum += dailyLog[i] * dailyLog[i];
    xySum += dailyLog[i] * attendanceLog[i];
  }

  // Calculate slope and intercept
  var slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
  var intercept = ySum / count - (slope * xSum) / count;

  let today = dailyLog.length + 1;
  let predictedVal = today * slope + intercept;

  return predictedVal;
}
