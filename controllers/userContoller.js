import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "../db.json");

// Read database file
const readDatabase = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

// Write to database file
const writeDatabase = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Get all users
export const getUsers = (req, res) => {
  const db = readDatabase();
  res.json(db.users);
};

// Get user by ID
export const getUserById = (req, res) => {
  const db = readDatabase();
  const user = db.users.find((user) => user.id === Number(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
};

// Add user
export const addUser = (req, res) => {
  try {
    const db = readDatabase();
    if (!db.users) db.users = [];

    const newUser = { id: Date.now(), ...req.body };
    db.users.push(newUser);
    writeDatabase(db);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user
export const updateUser = (req, res) => {
  const db = readDatabase();
  const index = db.users.findIndex((user) => user.id === Number(req.params.id));

  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDatabase(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

// Delete user
export const deleteUser = (req, res) => {
  const db = readDatabase();
  const filteredUsers = db.users.filter(
    (user) => user.id !== Number(req.params.id)
  );

  if (filteredUsers.length !== db.users.length) {
    db.users = filteredUsers;
    writeDatabase(db);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
