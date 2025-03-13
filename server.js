import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/productRoutes.js";
import requestLogger from "./middlewares/logger.js"; 
import connectDB from "./dbConfig/dbConfig.js"; // Change 'require' to 'import'
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Server is starting...");

// Connect to MongoDB
connectDB();

// ✅ Apply Middleware BEFORE defining routes
app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes

app.use("/api", productRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
