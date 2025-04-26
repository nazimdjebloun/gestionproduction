import express from "express";
import clientFolderController from "../controllers/clientfolders.controller.js";
const router = express.Router();

// GET all Product
router.get("/", clientFolderController.getAllClientFolders);

// GET single Product
router.get("/:id", clientFolderController.getClientFolderById);

// GET single Product
router.get("/client/:id", clientFolderController.getClientFolderByclientId);


// POST new Product
router.post("/", clientFolderController.createClientFolder);

// PUT update Product
router.put("/:id", clientFolderController.updateClientFolder);

// DELETE Product
router.delete("/:id", clientFolderController.deleteClientFolder);

export default router;
