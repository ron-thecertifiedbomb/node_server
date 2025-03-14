import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
} from "../controllers/employeeController/employeeController.js";
import requestLogger from "../middlewares/logger.js";

const router = express.Router();

router.use(requestLogger);

// Route to create a new employee
router.post("/", createEmployee);

// Route to get all employees
router.get("/", getAllEmployees);

// Route to get an employee by ID
router.get("/:id", getEmployeeById);

export default router;
