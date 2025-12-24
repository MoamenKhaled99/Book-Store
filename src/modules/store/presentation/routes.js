import express from "express";
import { downloadReportController } from "./controllers/store.controller.js";

const router = express.Router();

router.get("/:id/download-report", downloadReportController);

export default router;
