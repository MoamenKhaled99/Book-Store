import { uploadInventoryService } from "../../services/inventory.service.js";
import { validateInventoryUpload } from "../validators/inventory.validation.js";

async function uploadInventoryController(req, res, next) {
  validateInventoryUpload(req.file);

  const csvData = req.file.buffer.toString("utf-8");
  const result = await uploadInventoryService(csvData);

  res.status(200).json({
    success: true,
    message: "Inventory uploaded successfully",
    data: result,
  });
}

export { uploadInventoryController };
