const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patientName: String,
  doctor: String,
  date: String,
  time: String,
  status: { type: String, enum: ["Pending","Confirmed","Cancelled"], default: "Pending" }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
