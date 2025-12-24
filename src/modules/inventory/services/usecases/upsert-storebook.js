import {
  findStoreBook,
} from "../../repository/inventory.read.repository.js";
import {
  createStoreBook,
  updateStoreBook,
} from "../../repository/inventory.write.repository.js";

async function upsertStoreBook(storeBookData) {
  const existing = await findStoreBook(storeBookData.storeId, storeBookData.bookId);

  if (existing) {
    const updated = await updateStoreBook(storeBookData.storeId, storeBookData.bookId, {
      copies: existing.copies + 1,
      price: storeBookData.price,
    });
    return { data: updated, created: false };
  }

  const created = await createStoreBook({
    ...storeBookData,
    copies: 1,
  });
  return { data: created, created: true };
}

export { upsertStoreBook };
