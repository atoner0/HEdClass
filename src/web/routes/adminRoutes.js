import express from "express";
const router = express.Router();
import adminController from "../controllers/adminController.js";

router.get("/", adminController.getAdminDash);
router.get("/officers", adminController.getOfficers);
router.get("/officers/:id", adminController.updateOfficer);
router.post("/officer/edit", adminController.postAdminUpdateOfficer);
router.get("/officer/add", adminController.getAddOfficer);
router.post("/officer/add", adminController.postAddOfficer);
router.post("/officer/delete/:id", adminController.adminDeleteOfficer);

export default router;