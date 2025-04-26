
import express from "express";
import materialController from "../controllers/materials.controller.js";
const router = express.Router();

// GET all Materials
router.get("/", materialController.getAllMaterials);

// GET single Materials
router.get("/:id", materialController.getMaterialById);

// GET single Materials
router.get("/productionfile/:id", materialController.getMaterialByFileId);

// POST new Materials
router.post("/", materialController.createMaterial);

// PUT update Materials
router.put("/:id", materialController.updateMaterial);

// DELETE Materials
router.delete("/:id", materialController.deleteMaterial);

export default router;
