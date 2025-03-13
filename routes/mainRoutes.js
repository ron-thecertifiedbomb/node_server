import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html for SSR
router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default router;
