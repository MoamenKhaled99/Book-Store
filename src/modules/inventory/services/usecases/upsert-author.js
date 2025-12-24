import {
  findAuthorByName,
} from "../../repository/inventory.read.repository.js";
import {
  createAuthor,
} from "../../repository/inventory.write.repository.js";

async function upsertAuthor(authorData) {
  const existing = await findAuthorByName(authorData.name);

  if (existing) {
    return { data: existing, created: false };
  }

  const created = await createAuthor(authorData);
  return { data: created, created: true };
}

export { upsertAuthor };
