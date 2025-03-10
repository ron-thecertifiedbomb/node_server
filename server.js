const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "db.json");

// Middleware
app.use(express.json());
app.use(cors());

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

app.use(express.static(path.join(__dirname, "public")));
// Serve index.html for SSR
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all items
app.get("/api/users", (req, res) => {
  const db = readDatabase();
  res.json(db.users);
});

// Get a single user by ID
app.get("/api/user/:id", (req, res) => {
    const db = readDatabase();
    const user = db.users.find((user) => user.id === Number(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: "User not found" });
  });

// Add a new item
app.post("/api/users", (req, res) => {
  const db = readDatabase();
  const newUser = { id: Date.now(), ...req.body };
  db.items.push(newUser);
  writeDatabase(db);
  res.status(201).json(newUser);
});

// Update an item
app.put("/api/user/:id", (req, res) => {
  const db = readDatabase();
  const index = db.user.findIndex((user) => user.id === Number(req.params.id));

  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDatabase(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Delete an item
app.delete("/api/users/:id", (req, res) => {
  const db = readDatabase();
  const filteredUsers = db.users.filter((user) => user.id !== Number(req.params.id));

  if (filteredUsers.length !== db.users.length) {
    db.users = filteredUsers;
    writeDatabase(db);
    res.json({ message: "Item deleted successfully" });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
