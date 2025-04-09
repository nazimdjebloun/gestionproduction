import express from "express";
import productController from "../controllers/product.controller.js";
const router = express.Router();

// GET all Product
router.get("/", productController.getAllProducts);

// GET single Product
router.get("/:id", productController.getProductById);

// POST new Product
router.post("/", productController.createProduct);

// PUT update Product
router.put("/:id", productController.updateProduct);

// DELETE Product
router.delete("/:id", productController.deleteProduct);

export default router;
