import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController/productController.js";
import requestLogger from "../middlewares/logger.js"; 
import cacheMiddleware from "../middlewares/cacheMiddleware.js"; 
const router = express.Router();

router.use(requestLogger);


// Route to create a new product
router.post("/", requestLogger, createProduct);

// Route to get all products
router.get("/", cacheMiddleware,  getAllProducts);

// Route to get a product by ID
router.get("/:id", getProductById);

export default router;
