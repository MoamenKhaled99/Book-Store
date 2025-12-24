import { getPrisma } from "../../../config/prisma.js";

const prisma = getPrisma();

async function findStoreByName(name) {
  return await prisma.store.findUnique({
    where: { name },
  });
}

async function findAuthorByName(name) {
  return await prisma.author.findUnique({
    where: { name },
  });
}

async function findBookByNameAndAuthor(name, authorId) {
  return await prisma.book.findFirst({
    where: {
      name,
      authorId,
    },
  });
}

async function findStoreBook(storeId, bookId) {
  return await prisma.storeBook.findUnique({
    where: {
      storeId_bookId: {
        storeId,
        bookId,
      },
    },
  });
}

export {
  findStoreByName,
  findAuthorByName,
  findBookByNameAndAuthor,
  findStoreBook,
};
