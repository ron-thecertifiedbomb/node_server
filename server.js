import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import mainRoutes from "./routes/mainRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 console.log("Server is starting...");
// Middleware

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/api", userRoutes);
app.use("/", mainRoutes); // Correct router import and usage

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
 
);
