import express from "express";
const router = express.Router();
import officerController from "../controllers/officerController.js";

router.get("/", officerController.getOfficerDash);
router.get("/programme/:id/students", officerController.getProgrammeStudents);


export default router;