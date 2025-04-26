import productionFileService from "../services/productionFiles.service.js";
import express from "express";

const productionFileController = {
  getAllProductionFiles: async (req, res, next) => {
    try {
      const productionFile =
        await productionFileService.getAllProductionFiles();
      res.status(200).json({
        success: true,
        count: productionFile.length,
        data: productionFile,
      });
    } catch (error) {
      next(error);
    }
  },

  getProductionFileById: async (req, res, next) => {
    try {
      const productionFile = await productionFileService.getProductionFileById(
        req.params.id
      );
      if (!productionFile) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
        });
      }
      res.status(200).json({
        success: true,
        data: productionFile,
      });
    } catch (error) {
      next(error);
    }
  },
  getAllProductsByProductionFile: async (req, res, next) => {
    try {
      const { id } = req.params; // id_fiche_production

      const products =
        await productionFileService.getAllProductsByProductionFile(id);

      if (!products || products.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No products found for this production file",
        });
      }

      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductionFileByFolderId: async (req, res, next) => {
    try {
      const productionFile =
        await productionFileService.getProductionFileByFolderId(req.params.id);
      if (!productionFile) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
        });
      }
      res.status(200).json({
        success: true,
        count: productionFile.length,
        data: productionFile,
      });
    } catch (error) {
      next(error);
    }
  },

  createProductionFile: async (req, res, next) => {
    try {
      const { data, selectedOrders } = req.body;
      const clientFolder = await productionFileService.createProductionFile(
        data,
        selectedOrders
      );
      console.log("Received request body:", req.body);
      res.status(201).json({
        success: true,
        data: clientFolder,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateProductionFile: async (req, res, next) => {
    const { hours, folder } = req.body;
    const { id } = req.params;
    try {
      const productionFile = await productionFileService.updateProductionFile(
        id,
        hours,
        folder
      );
      if (!productionFile) {
        return res.status(404).json({
          success: false,
          message: "dossier client  not found",
        });
      }
      res.status(200).json({
        success: true,
        data: productionFile,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProductionFile: async (req, res, next) => {
    try {
      const result = await productionFileService.deleteProductionFile(
        req.params.id
      );
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
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
  employesProductionFile: async (req, res, next) => {
    try {
      const { selectedEmployes } = req.body;
      const result = await productionFileService.employesProductionFile(
        req.params.id,
        selectedEmployes
      );
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
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

  materialsProductionFile: async (req, res, next) => {
    try {
      const { selectedMaterials } = req.body;

      const result = await productionFileService.materialsProductionFile(
        req.params.id,
        selectedMaterials
      );
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
        });
      }
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
export default productionFileController;
