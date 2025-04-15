import orderService from "../services/orders.service.js";
import express from "express";

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getAllOrders();
      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  },
  getOrderById: async (req, res, next) => {
    try {
      const order = await orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "dossier client not found",
        });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
  getOrderByClientFolderId: async (req, res, next) => {
    try {
      const orders = await orderService.getOrderByClientFolderId(req.params.id);
      // if (!orders) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "dossier client not found",
      //   });
      // }
      // res.status(200).json({
      //   success: true,
      //   count: orders.length,
      //   data: orders,
      // });
            res.status(200).json({
              success: true,
              count: orders.length,
              data: orders,
            });
    } catch (error) {
      next(error);
    }
  },

  createClientFolder: async (req, res, next) => {
    try {
      const { client, selectedProducts } = req.body;
      const clientFolder = await orderService.createClientFolder(
        client,
        selectedProducts
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

  updateOrder: async (req, res, next) => {
    try {
      const order = await orderService.updateOrder(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "dossier client  not found",
        });
      }
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const result = await orderService.deleteOrder(req.params.id);
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
export default orderController;
