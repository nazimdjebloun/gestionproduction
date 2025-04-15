import express from "express";
import shopController from "../controllers/shops.controller.js";

const router = express.Router();

// GET /api/shops - get all shops
router.get("/", shopController.getAllShops);

// GET /api/shops/:id - get one shop
router.get("/:id", shopController.getShopById);

// GET /api/shops/:id - get one shop by department id
router.get("/dep/:id", shopController.getShopByDepartmentId);

// POST /api/shops - create a new shop
router.post("/", shopController.createShop);

// PUT /api/shops/:id - update a shop
router.put("/:id", shopController.updateShop);

// DELETE /api/shops/:id - delete a shop
router.delete("/:id", shopController.deleteShop);

export default router;
