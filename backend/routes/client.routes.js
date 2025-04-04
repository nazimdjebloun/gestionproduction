import express from "express";
import clientController from "../controllers/client.controller.js";
const router = express.Router();

// GET all clients
router.get("/", clientController.getAllClients);

// GET single client
router.get("/:id", clientController.getClientById);

// POST new client
router.post("/", clientController.createClient);

// PUT update client
router.put("/:id", clientController.updateClient);

// DELETE client
router.delete("/:id", clientController.deleteClient);

export default router;