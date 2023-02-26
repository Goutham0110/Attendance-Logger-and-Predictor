const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const {
  renderPage,
  addAttendance,
  predictAttendance,
  viewAttendance,
} = require("./controller/controller");

//db connection
mongoose.connect("mongodb://localhost:27017/attendancePredictor", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database connected successfully");
});

//middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

//API
app.get("/attendance", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/attendance/predict", predictAttendance);
app.post("/attendance/add", addAttendance);
app.get("/attendance/view", viewAttendance);

//host server
app.listen(5500, () => {
  console.log(
    "\n\nServer running...\nType this url in the browser: http://localhost:5500/attendance"
  );
});
