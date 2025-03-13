import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, "../products.json");

// Read database file safely
const readDatabase = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(
        DB_FILE,
        JSON.stringify({ products: [] }, null, 2),
        "utf-8"
      );
    }
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return { products: [] }; // Return empty list on failure
  }
};

// Write to database file safely
const writeDatabase = (data) => {
  try {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format");
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database:", error);
  }
};

// API endpoint to get products
export const getProducts = (req, res) => {
  const db = readDatabase();
  res.json(db.products);
};
