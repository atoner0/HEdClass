import express from "express";
const router = express.Router();
import officerController from "../controllers/officerController.js";

router.get("/", officerController.getOfficerDash);
router.get("/programme/:programmeId/students", officerController.getProgrammeStudents);
router.get("/programme/:programmeId/student/:studentId/edit", officerController.getUpdateStudent);
router.post("/programme/:programmeId/student/:studentId/edit", officerController.postUpdateStudent);
router.get("/programme/:programmeId/student/add", officerController.getAddStudent);
router.post("/programme/:programmeId/student/add", officerController.postAddStudent);
router.post("/programme/:programmeId/student/delete/:studentId", officerController.officerDeleteStudent);
router.get("/programme/:programmeId/student/:studentId/results", officerController.getStudentResults);
router.get("/programme/:programmeId/student/:studentId/result/:resultId/edit", officerController.getUpdateResult);
router.post("/programme/:programmeId/student/:studentId/result/:resultId/edit", officerController.postUpdateResult);
router.get("/programme/:programmeId/student/:studentId/result/add", officerController.getAddResult);
router.post("/programme/:programmeId/student/:studentId/result/add", officerController.postAddResult);
router.post("/programme/:programmeId/student/:studentId/result/:resultId/delete", officerController.officerDeleteStudentResult)
router.get("/programme/:programmeId/student/:studentId/override", officerController.getOverrideClass)
router.post("/programme/:programmeId/student/:studentId/override", officerController.postOverrideClass)
router.post("/programme/:programmeId/student/:studentId/approve", officerController.postApproveClass)
router.get("/statistics/:programmeId", officerController.getStatistics)


export default router;