import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import mainRoutes from "./routes/mainRoutes.js";
import qrRoutes from "./routes/qrRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import requestLogger from "./middlewares/logger.js"; 

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Server is starting...");

// ✅ Apply Middleware BEFORE defining routes
app.use(requestLogger);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", userRoutes);
app.use("/", mainRoutes);
app.use("/qr", qrRoutes);
app.use("/api", productsRoutes);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
