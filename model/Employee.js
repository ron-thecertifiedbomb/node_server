import mongoose from "mongoose";


const TimeLogSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  timeIn: { type: Date, required: true },
  timeOut: { type: Date },
  totalHours: { type: Number, default: 0 },
});

// Middleware to update totalHours before saving
TimeLogSchema.pre("save", function (next) {
  if (this.timeIn && this.timeOut) {
    // ✅ Ensures accurate time difference calculation
    this.totalHours = (this.timeOut - this.timeIn) / (1000 * 60 * 60);
  }
  next();
});

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  position: { type: String },
  department: { type: String },
  timeLogs: { type: [TimeLogSchema], default: [] }, // ✅ Always defaults to an empty array
  qrCode: { type: String },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;
