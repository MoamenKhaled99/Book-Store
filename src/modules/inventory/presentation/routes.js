import express from "express";
import multer from "multer";
import { uploadInventoryController } from "./controllers/inventory.controller.js";

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

router.post("/upload", upload.single("file"), uploadInventoryController);

export default router;
