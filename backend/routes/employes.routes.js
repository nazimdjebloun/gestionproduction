import express from "express";
import employeController from "../controllers/employes.controller.js";
const router = express.Router();

// GET all Materials
router.get("/", employeController.getAllEmployes);

// GET single Materials
router.get("/:id", employeController.getEmployeById);

// POST new Materials
router.post("/", employeController.createEmploye);

// PUT update Materials
router.put("/:id", employeController.updateEmploye);

// DELETE Materials
router.delete("/:id", employeController.deleteEmploye);

export default router;
