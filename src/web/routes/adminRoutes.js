import express from "express";
const router = express.Router();
import adminController from "../controllers/adminController.js";

router.get("/", adminController.getAdminDash);
router.get("/officers", adminController.getOfficers);

export default router;