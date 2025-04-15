import express from "express";
import departmentController from "../controllers/departments.controller.js";
const router = express.Router();

// GET all clients
router.get("/", departmentController.getAllDepartments);

// GET single client
router.get("/:id", departmentController.getDepartmentById);


// GET single client
router.get("folder/:id", departmentController.getDepartmentByFodlerId);

// POST new client
router.post("/", departmentController.createDepartment);

// PUT update client
router.put("/:id", departmentController.updateDepartment);

// DELETE client
router.delete("/:id", departmentController.deleteDepartment);

export default router;
