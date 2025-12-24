import {
  findBookByNameAndAuthor,
} from "../../repository/inventory.read.repository.js";
import {
  createBook,
  updateBook,
} from "../../repository/inventory.write.repository.js";

async function upsertBook(bookData) {
  const existing = await findBookByNameAndAuthor(bookData.name, bookData.authorId);

  if (existing) {
    if (existing.pages !== bookData.pages) {
      const updated = await updateBook(existing.id, { pages: bookData.pages });
      return { data: updated, created: false };
    }
    return { data: existing, created: false };
  }

  const created = await createBook(bookData);
  return { data: created, created: true };
}

export { upsertBook };
