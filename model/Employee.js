import mongoose from "mongoose";

const TimeLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  totalHours: {
    type: Number,
    default: function () {
      if (this.timeIn && this.timeOut) {
        return (this.timeOut - this.timeIn) / (1000 * 60 * 60); // Convert ms to hours
      }
      return 0;
    },
  },
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  position: { type: String },
  department: { type: String },
  timeLogs: [TimeLogSchema], // Array of time-in/time-out records
  qrCode: { type: String }, // Added field for QR code
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
