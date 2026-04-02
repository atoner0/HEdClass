import express from "express";
import classificationAPIController from "../controllers/classificationAPIController.js";

const router = express.Router();

router.post("/programmes/:programmeId/classifications/run", classificationAPIController.runBatchClassification);

export default router;