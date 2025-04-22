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
      const productionFile = await productionFileService.getproductionFileById(
        req.params.id
      );
      if (!clientFolder) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
        });
      }
      res.status(200).json({
        success: true,
        data: clientFolder,
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
    try {
      const productionFile = await productionFileService.updateproductionFile(
        req.params.id,
        req.body
      );
      if (!clientFolder) {
        return res.status(404).json({
          success: false,
          message: "dossier client  not found",
        });
      }
      res.status(200).json({
        success: true,
        data: clientFolder,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProductionFile: async (req, res, next) => {
    try {
      const result = await clientFolderService.deleteClientFolder(
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
};
export default productionFileController;
