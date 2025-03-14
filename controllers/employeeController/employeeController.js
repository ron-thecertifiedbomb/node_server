import Employee from "../../model/Employee.js";
import QRCode from "qrcode";

// Controller to create a new employee
export const createEmployee = async (req, res) => {
  const { name, employeeId, position, department, timeLogs } = req.body;

  if (!name || !employeeId || !position || !department || !timeLogs) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const existingEmployee = await Employee.findOne({ employeeId });
    if (existingEmployee) {
      console.log(`ERROR: Employee with ID "${employeeId}" already exists.`);
      return res
        .status(400)
        .json({ message: "Employee with the same ID already exists" });
    }

    // Generate QR Code for the employee
    const qrCodeData = await QRCode.toDataURL(employeeId);

    const newEmployee = new Employee({
      name,
      employeeId,
      position,
      department,
      timeLogs,
      qrCode: qrCodeData,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res
      .status(500)
      .json({ message: "Error adding employee", error: error.message });
  }
};

// Controller to get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
};

// Controller to get an employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
};
