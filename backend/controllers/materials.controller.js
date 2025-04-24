// controllers/shop.controller.js
import materialService from "../services/materials.service.js";
import express from "express";

const materialController = {
  // Get all shops
  getAllMaterials: async (req, res, next) => {
    try {
      const materials = await materialService.getAllMaterials();
      res.status(200).json({
        success: true,
        count: materials.length,
        data: materials,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single shop
  getMaterialById: async (req, res, next) => {
    try {
      const material = await materialService.getMaterialById(req.params.id);
      if (!material) {
        return res.status(404).json({
          success: false,
          message: "material not found",
        });
      }
      res.status(200).json({
        success: true,
        data: material,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new shop
  createMaterial: async (req, res, next) => {
    try {
      const material = await materialService.createMaterial(req.body);
      res.status(201).json({
        success: true,
        data: material,
      });
    } catch (error) {
      next(error);
    }
  },

    updateMaterial: async (req, res, next) => {
      try {
        const material = await materialService.updateMaterial(
          req.params.id,
          req.body
        );
        if (!material) {
          return res.status(404).json({
            success: false,
            message: "material not found",
          });
        }
        res.status(200).json({
          success: true,
          data: material,
        });
      } catch (error) {
        next(error);
      }
    },

    // Delete
    deleteMaterial: async (req, res, next) => {
      try {
        const result = await materialService.deleteMaterial(req.params.id);
        if (!result) {
          return res.status(404).json({
            success: false,
            message: "material not found",
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

export default materialController;
