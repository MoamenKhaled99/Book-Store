import { 
  findStoreById, 
  findTop5PriciestBooks, 
  findTop5ProlificAuthors 
} from "../repository/store.read.repository.js";
import { generatePDF } from "./utils/pdf.generator.js";
import { formatReportFilename } from "./validators/store_service.validation.js";

async function generateReportService(storeId) {
  const store = await findStoreById(storeId);

  if (!store) {
    const err = {
      message: "Store not found",
      type: "NotFoundError",
    };
    throw err;
  }

  const top5Books = await findTop5PriciestBooks(storeId);

  const top5Authors = await findTop5ProlificAuthors(storeId);

  const pdfBuffer = await generatePDF(store, top5Books, top5Authors);

  const filename = formatReportFilename(store.name);

  return { pdfBuffer, filename };
}

export { generateReportService };
