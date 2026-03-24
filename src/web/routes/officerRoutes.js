import express from "express";
const router = express.Router();
import officerController from "../controllers/officerController.js";

router.get("/", officerController.getOfficerDash);
router.get("/programme/:id/students", officerController.getProgrammeStudents);
router.get("/programme/:programmeId/student/:studentId/edit", officerController.getUpdateStudent);
router.post("/programme/:programmeId/student/:studentId/edit", officerController.postUpdateStudent);
router.get("/programme/:id/student/add", officerController.getAddStudent);
router.post("/programme/:id/student/add", officerController.postAddStudent);
router.post("/programme/:programmeId/student/delete/:studentId", officerController.officerDeleteStudent);


export default router;