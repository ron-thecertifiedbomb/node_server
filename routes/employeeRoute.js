import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  logEmployeeTime,
} from "../controllers/employeeController/employeeController.js";

const router = express.Router();

// Route to create a new employee
router.post("/", createEmployee);

// Route to get all employees
router.get("/", getAllEmployees);

// Route to get an employee by ID
router.get("/:id", getEmployeeById);

// Route to delete employee by ID
router.delete("/:id", deleteEmployee);

// Route to log employee using Qr code
router.post("/log-time", logEmployeeTime);

export default router;
