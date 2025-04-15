import express from "express";
import orderController from "../controllers/orders.controller.js";
const router = express.Router();

// GET all Order
router.get("/", orderController.getAllOrders);

// GET single Order
router.get("/:id", orderController.getOrderById);

// GET single Order
router.get("/clientfodler/:id", orderController.getOrderByClientFolderId);

// // POST new Order
// router.post("/", orderController.createOrder);

// PUT update Order
router.put("/:id", orderController.updateOrder);

// DELETE Order
router.delete("/:id", orderController.deleteOrder);

export default router;
