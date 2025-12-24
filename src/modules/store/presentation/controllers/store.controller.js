import { generateReportService } from "../../services/store.service.js";
import { validateStoreId } from "../validators/store.validation.js";

async function downloadReportController(req, res, next) {
  try {
    const { id } = req.params;

    validateStoreId(id);

    const { pdfBuffer, filename } = await generateReportService(Number(id));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
}

export { downloadReportController };
