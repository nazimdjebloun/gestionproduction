import employeService from "../services/employes.service.js";

const employeController = {
  // Get all employes
  getAllEmployes: async (req, res, next) => {
    try {
      const employes = await employeService.getAllEmployes();
      res.status(200).json({
        success: true,
        count: employes.length,
        data: employes,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get single employe
  getEmployeById: async (req, res, next) => {
    try {
      const employe = await employeService.getEmployeById(req.params.id);
      if (!employe) {
        return res.status(404).json({
          success: false,
          message: "Employe not found",
        });
      }
      res.status(200).json({
        success: true,
        data: employe,
      });
    } catch (error) {
      next(error);
    }
  },
  getEmployeByFileId: async (req, res, next) => {
    try {
      const employes = await employeService.getEmployeByFileId(req.params.id);

      res.status(200).json({
        success: true,
        count: employes.length,
        data: employes,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new employe
  createEmploye: async (req, res, next) => {
    try {
      const employe = await employeService.createEmploye(req.body);
      res.status(201).json({
        success: true,
        data: employe,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update employe
  updateEmploye: async (req, res, next) => {
    try {
      const updatedEmploye = await employeService.updateEmploye(
        req.params.id,
        req.body
      );
      if (!updatedEmploye) {
        return res.status(404).json({
          success: false,
          message: "Employe not found",
        });
      }
      res.status(200).json({
        success: true,
        data: updatedEmploye,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete employe
  deleteEmploye: async (req, res, next) => {
    try {
      const deletedEmploye = await employeService.deleteEmploye(req.params.id);
      if (!deletedEmploye) {
        return res.status(404).json({
          success: false,
          message: "Employe not found",
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

export default employeController;
