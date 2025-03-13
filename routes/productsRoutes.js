import express from "express";
import { getProducts } from "../controllers/productController.js";
import cacheMiddleware from "../middlewares/cacheMiddleware.js"; // Adjust path to middleware

const router = express.Router();

// Apply cacheMiddleware before calling the getProducts controller
router.get("/products", cacheMiddleware, getProducts);

export default router;
