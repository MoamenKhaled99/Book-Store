import { parseCSV } from "../utils/csv.parser.js";
import { upsertStore } from "./upsert-store.js";
import { upsertAuthor } from "./upsert-author.js";
import { upsertBook } from "./upsert-book.js";
import { upsertStoreBook } from "./upsert-storebook.js";

async function uploadInventory(csvData) {
  const rows = await parseCSV(csvData);

  const results = {
    processed: 0,
    created: {
      stores: 0,
      authors: 0,
      books: 0,
      storeBooks: 0,
    },
    updated: {
      storeBooks: 0,
    },
    errors: [],
  };

  for (const row of rows) {
    try {
      // Validate row has required fields
      if (!row.store_name || !row.book_name || !row.author_name) {
        results.errors.push({
          row,
          error: "Missing required fields (store_name, book_name, or author_name)",
        });
        continue;
      }

      // Upsert Store
      const store = await upsertStore({
        name: row.store_name.trim(),
        address: row.store_address?.trim() || "",
        logo: row.logo?.trim() || null,
      });
      if (store.created) {
        results.created.stores++;
      }

      // Upsert Author
      const author = await upsertAuthor({
        name: row.author_name.trim(),
      });
      if (author.created) {
        results.created.authors++;
      }

      // Upsert Book
      const book = await upsertBook({
        name: row.book_name.trim(),
        pages: parseInt(row.pages) || 0,
        authorId: author.data.id,
      });
      if (book.created) {
        results.created.books++;
      }

      // Upsert StoreBook (many-to-many relationship)
      const storeBook = await upsertStoreBook({
        storeId: store.data.id,
        bookId: book.data.id,
        price: parseFloat(row.price) || 0.0,
      });
      results[storeBook.created ? "created" : "updated"].storeBooks++;

      results.processed++;
    } catch (error) {
      results.errors.push({
        row,
        error: error.message,
      });
    }
  }

  return results;
}

export { uploadInventory };
