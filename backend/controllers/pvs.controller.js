// controllers/pv.controller.js
import pvService from "../services/pvs.service.js";

const pvController = {
  // Get all PVs
  getAllPVs: async (req, res, next) => {
    try {
      const pvs = await pvService.getAllPVs();
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  getPVsValidated: async (req, res, next) => {
    try {
      const pvs = await pvService.getPVsValidated();
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  getPVsEnTraitement: async (req, res, next) => {
    try {
      const pvs = await pvService.getPVsByStatus("entraitement");
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  getPVsEnTraitementByDossierId: async (req, res, next) => {
    try {
      const pvs = await pvService.getPVsByDossierIdAndStatus(
        req.params.id_dossier
      );
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  getPVsByDossierId: async (req, res, next) => {
    try {
      const pvs = await pvService.getPVsByDossierId(req.params.id_dossier);
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  // Get PVs with reservation
  getPVsWithReservation: async (req, res, next) => {
    try {
      const pvs = await pvService.getPVsWithReservation();
      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  getPVsByDossierIdWithReserve: async (req, res, next) => {
    try {
      const { id_dossier } = req.params;

      const pvs = await pvService.getPVsByDossierIdWithReserve(id_dossier);

      res.status(200).json({
        success: true,
        count: pvs.length,
        data: pvs,
      });
    } catch (error) {
      next(error);
    }
  },
  // Get single PV
  getPVById: async (req, res, next) => {
    try {
      const pv = await pvService.getPVById(req.params.id);
      if (!pv) {
        return res.status(404).json({
          success: false,
          message: "PV not found",
        });
      }
      res.status(200).json({
        success: true,
        data: pv,
      });
    } catch (error) {
      next(error);
    }
  },

  // Create new PV
  createPV: async (req, res, next) => {
    try {
      const folderId = req.params;

      const pv = await pvService.createPV(folderId);
      res.status(201).json({
        success: true,
        data: pv,
      });
    } catch (error) {
      next(error);
    }
  },

  // Update PV
  updatePV: async (req, res, next) => {
    try {
      const pv = await pvService.updatePV(req.params.id, req.body);
      if (!pv) {
        return res.status(404).json({
          success: false,
          message: "PV not found",
        });
      }
      res.status(200).json({
        success: true,
        data: pv,
      });
    } catch (error) {
      next(error);
    }
  },
  updatePVvalide: async (req, res, next) => {
    try {
      const pv = await pvService.updatePVvalide(req.params.id);
      if (!pv) {
        return res.status(404).json({
          success: false,
          message: "PV not found",
        });
      }
      res.status(200).json({
        success: true,
        data: pv,
      });
    } catch (error) {
      next(error);
    }
  },
  updatePVreject: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { reserve } = req.body;

      const pv = await pvService.updatePVreject(id, reserve);
      if (!pv) {
        return res.status(404).json({
          success: false,
          message: "PV not found",
        });
      }
      res.status(200).json({
        success: true,
        data: pv,
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete PV
  deletePV: async (req, res, next) => {
    try {
      const result = await pvService.deletePV(req.params.id);
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "PV not found",
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

export default pvController;
