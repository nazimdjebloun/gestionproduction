import express from "express";
import productionFileController from "../controllers/productionfiles.controller.js";
const router = express.Router();

// GET all Product
router.get("/", productionFileController.getAllProductionFiles);

// GET single Product
router.get("/:id", productionFileController.getProductionFileById);

// POST new Product
router.post("/", productionFileController.createProductionFile);

// PUT update Product
router.put("/:id", productionFileController.updateProductionFile);

// DELETE Product
router.delete("/:id", productionFileController.deleteProductionFile);

export default router;
