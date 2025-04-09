// controllers/shop.controller.js
import shopService from "../services/shops.service.js";
import express from "express";

const shopController = {
  // Get all shops
  getAllShops: async (req, res, next) => {
    try {
      const shops = await shopService.getAllShops();
      res.status(200).json({
        success: true,
        count: shops.length,
        data: shops,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single shop
  getShopById: async (req, res, next) => {
    try {
      const shop = await shopService.getShopById(req.params.id);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }
      res.status(200).json({
        success: true,
        data: shop,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new shop
  createShop: async (req, res, next) => {
    try {
      const shop = await shopService.createShop(req.body);
      res.status(201).json({
        success: true,
        data: shop,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update shop
  updateShop: async (req, res, next) => {
    try {
      const shop = await shopService.updateShop(req.params.id, req.body);
      if (!shop) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }
      res.status(200).json({
        success: true,
        data: shop,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete shop
  deleteShop: async (req, res, next) => {
    try {
      const result = await shopService.deleteShop(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Shop not found",
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  },
};

export default shopController;
