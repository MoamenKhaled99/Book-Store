import {
  findStoreByName,
} from "../../repository/inventory.read.repository.js";
import {
  createStore,
  updateStore,
} from "../../repository/inventory.write.repository.js";

async function upsertStore(storeData) {
  const existing = await findStoreByName(storeData.name);

  if (existing) {
    if (storeData.logo && existing.logo !== storeData.logo) {
      const updated = await updateStore(existing.id, {
        address: storeData.address,
        logo: storeData.logo,
      });
      return { data: updated, created: false };
    }
    return { data: existing, created: false };
  }

  const created = await createStore(storeData);
  return { data: created, created: true };
}

export { upsertStore };
