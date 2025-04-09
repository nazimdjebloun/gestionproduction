import departmentService from "../services/departments.service.js";
import express from "express";

const departmentController = {
  // Get all clients
  getAllDepartments: async (req, res, next) => {
    try {
      const departments = await departmentService.getAllDepartments();
      res.status(200).json({
        success: true,
        count: departments.length,
        data: departments,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single client
  getDepartmentById: async (req, res, next) => {
    try {
      const department = await departmentService.getDepartmentById(
        req.params.id
      );
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }
      res.status(200).json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new client
  createDepartment: async (req, res, next) => {
    try {
      const department = await departmentService.createDepartment(req.body);
      res.status(201).json({
        success: true,
        data: department,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update client
  updateDepartment: async (req, res, next) => {
    try {
      const department = await departmentService.updateDepartment(
        req.params.id,
        req.body
      );
      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }
      res.status(200).json({
        success: true,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete client
  deleteDepartment: async (req, res, next) => {
    try {
      const result = await departmentService.deleteDepartment(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
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

export default departmentController;
