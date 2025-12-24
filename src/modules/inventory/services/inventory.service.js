import { uploadInventory } from "./usecases/upload-inventory.usecase.js";

async function uploadInventoryService(csvData) {
  return await uploadInventory(csvData);
}

export { uploadInventoryService };
