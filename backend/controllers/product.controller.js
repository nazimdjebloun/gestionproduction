import productService from "../services/products.service.js";
import express from "express";


const productController = {
  getAllProducts: async (req, res, next) => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const result = await productService.deleteProduct(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "product not found",
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
export default productController;
;