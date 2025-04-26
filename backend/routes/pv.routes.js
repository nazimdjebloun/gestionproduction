import express from "express";
import pvController from "../controllers/pvs.controller.js";

const router = express.Router();

// GET all PVs
router.get("/", pvController.getAllPVs);

// GET PVs in 'entraitement' status
router.get("/entraitement", pvController.getPVsEnTraitement);

// GET PVs by dossier ID
router.get("/dossier/:id_dossier", pvController.getPVsByDossierId);

// GET PVs with reserve by dossier ID
router.get(
  "/dossier/reserve/:id_dossier",
  pvController.getPVsByDossierIdWithReserve
);

// GET PVs in 'entraitement' status by dossier ID
router.get(
  "/dossier/entraitement/:id_dossier",
  pvController.getPVsEnTraitementByDossierId
);

// POST create new PV
router.post("/:id", pvController.createPV);

// PUT update PV
router.put("/:id", pvController.updatePV);


router.put("/valide/:id", pvController.updatePVvalide);


router.put("/rejete/:id", pvController.updatePVreject);


// DELETE PV
router.delete("/:id", pvController.deletePV);

export default router;
