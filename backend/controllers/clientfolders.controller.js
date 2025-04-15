import clientFolderService from "../services/clientfolders.service.js";
import express from "express";

const clientFolderController = {
  getAllClientFolders: async (req, res, next) => {
    try {
      const clientFolders = await clientFolderService.getAllClientFolders();
      res.status(200).json({
        success: true,
        count: clientFolders.length,
        data: clientFolders,
      });
    } catch (error) {
      next(error);
    }
  },
  getClientFolderById: async (req, res, next) => {
    try {
      const clientFolder = await clientFolderService.getClientFolderById(
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
  createClientFolder: async (req, res, next) => {
    try {
      const { data, selectedProducts } = req.body;
      const clientFolder = await clientFolderService.createClientFolder(
        data,
        selectedProducts
      );
      res.status(201).json({
        success: true,
        data: clientFolder,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateClientFolder: async (req, res, next) => {
    try {
      const clientFolder = await clientFolderService.updateClientFolder(
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
  deleteClientFolder: async (req, res, next) => {
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
export default clientFolderController;
