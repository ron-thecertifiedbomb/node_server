import Employee from "../../model/Employee.js";
import QRCode from "qrcode";



// Function to generate a unique 4-character employeeId
const generateUniqueEmployeeId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const tempId = Math.random().toString(36).substring(2, 6).toUpperCase(); // Random 4-char ID
    const existingEmployee = await Employee.findOne({ employeeId: tempId });

    if (!existingEmployee) {
      uniqueId = tempId;
      isUnique = true;
    }
  }

  return uniqueId;
};

// Controller to create a new employee
export const createEmployee = async (req, res) => {
  const { name, position, department, timeLogs } = req.body;

  if (!name || !position || !department || !timeLogs) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    // Check if an employee with the same name already exists
    const existingEmployee = await Employee.findOne({ name });

    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists", employee: existingEmployee });
    }

    // Generate a unique 4-character employeeId
    const employeeId = await generateUniqueEmployeeId();

    // Generate QR Code based on `employeeId`
    const qrCode = await QRCode.toDataURL(employeeId);

    // Create the new employee with the unique ID and QR code
    const newEmployee = new Employee({
      name,
      position,
      department,
      timeLogs,
      employeeId,
      qrCode,
    });

    // Save the employee
    await newEmployee.save();

    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Error adding employee", error: error.message });
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


// Controller to delete an employee by ID
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};

// Log employee by Qr code
export const logEmployeeTime = async (req, res) => {
  const { qrCode } = req.body;

  if (!qrCode) {
    return res.status(400).json({ message: "QR code is required" });
  }

  try {
    // Find employee by QR code
    const employee = await Employee.findOne({ qrCode });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const currentDate = new Date().toISOString();
    let lastLog =
      employee.timeLogs.length > 0
        ? employee.timeLogs[employee.timeLogs.length - 1]
        : null;

    if (!lastLog || lastLog.timeOut) {
      // Log Time-In
      employee.timeLogs.push({ timeIn: currentDate });
    } else {
      // Log Time-Out
      lastLog.timeOut = currentDate;
      lastLog.totalHours =
        (new Date(lastLog.timeOut) - new Date(lastLog.timeIn)) / 3600000; // Convert ms to hours
    }

    await employee.save();
    res.status(200).json({ message: "Time log updated", employee });
  } catch (error) {
    console.error("Error logging time:", error);
    res
      .status(500)
      .json({ message: "Error logging time", error: error.message });
  }
};