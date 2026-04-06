import express from "express";
import adminController from "../controllers/adminController.js";
import {requireAuth, requireAdmin} from "../middleware/auth.js";
const router = express.Router();

//protecting admin routes
router.use(requireAuth, requireAdmin);

router.get("/", adminController.getAdminDash);
router.get("/officers", adminController.getOfficers);
router.get("/officers/:id", adminController.adminUpdateOfficer);
router.post("/officer/edit", adminController.postAdminUpdateOfficer);
router.get("/officer/add", adminController.getAddOfficer);
router.post("/officer/add", adminController.postAddOfficer);
router.post("/officer/delete/:id", adminController.adminDeleteOfficer);
router.get("/programmes", adminController.getProgrammes);
router.get("/programmes/:id", adminController.getUpdateProgramme)
router.post("/programme/edit", adminController.postUpdateProgramme);
router.get("/programme/add", adminController.getAddProgramme);
router.post("/programme/add", adminController.postAddProgramme);
router.post("/programme/delete/:id", adminController.adminDeleteProgramme);

export default router;