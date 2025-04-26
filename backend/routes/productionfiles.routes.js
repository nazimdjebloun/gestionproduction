import express from "express";
import productionFileController from "../controllers/productionfiles.controller.js";
const router = express.Router();

// GET all Product
router.get("/", productionFileController.getAllProductionFiles);


// GET all Product for a file
router.get("/products/:id", productionFileController.getAllProductsByProductionFile);

// GET single Product
router.get("/:id", productionFileController.getProductionFileById);

// GET single Product
router.get(
  "/byfolder/:id",
  productionFileController.getProductionFileByFolderId
);

// POST new Product
router.post("/", productionFileController.createProductionFile);

// POST new Product
router.post("/materials/:id", productionFileController.materialsProductionFile);

// POST new Product
router.post("/employes/:id", productionFileController.employesProductionFile);


// PUT update Product
router.put("/:id", productionFileController.updateProductionFile);

// DELETE Product
router.delete("/:id", productionFileController.deleteProductionFile);

export default router;
