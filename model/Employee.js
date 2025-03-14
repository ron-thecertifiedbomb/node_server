import mongoose from "mongoose";

const TimeLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  totalHours: {
    type: Number,
    default: 0,
  },
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  position: { type: String },
  department: { type: String },
  timeLogs: [TimeLogSchema],
  qrCode: { type: String }, // ✅ Added QR Code field
});

// Middleware to update totalHours before saving
TimeLogSchema.pre("save", function (next) {
  if (this.timeIn && this.timeOut) {
    this.totalHours = (this.timeOut - this.timeIn) / (1000 * 60 * 60); // Convert ms to hours
  }
  next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
