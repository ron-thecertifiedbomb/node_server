import mongoose, { Schema, Document } from "mongoose";

// Define user roles
export enum UserRole {
  ADMIN = "Admin",
  MANAGER = "Manager",
  EMPLOYEE = "Employee",
  HR = "HR",
}

// Define department types
export enum Department {
  IT = "IT",
  FINANCE = "Finance",
  HR = "Human Resources",
  SALES = "Sales",
  MARKETING = "Marketing",
  OPERATIONS = "Operations",
}

// Define User Schema Interface
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  department: Department;
  jobTitle: string;
  company: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create User Schema
const UserSchema: Schema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false }, // Hidden in queries
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.EMPLOYEE,
    },
    department: {
      type: String,
      enum: Object.values(Department),
      required: true,
    },
    jobTitle: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export Mongoose Model
export const User = mongoose.model<IUser>("User", UserSchema);
