import express from "express";
import { getMonthlyAnalysis } from "../controllers/analysisController.js";

const router = express.Router();

router.get("/monthly-analysis", getMonthlyAnalysis);

export default router;