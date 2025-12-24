import { getPrisma } from "../../../config/prisma.js";

const prisma = getPrisma();

async function createStore(storeData) {
  return await prisma.store.create({
    data: storeData,
  });
}

async function updateStore(id, storeData) {
  return await prisma.store.update({
    where: { id },
    data: storeData,
  });
}

async function createAuthor(authorData) {
  return await prisma.author.create({
    data: authorData,
  });
}

async function createBook(bookData) {
  return await prisma.book.create({
    data: bookData,
  });
}

async function updateBook(id, bookData) {
  return await prisma.book.update({
    where: { id },
    data: bookData,
  });
}

async function createStoreBook(storeBookData) {
  return await prisma.storeBook.create({
    data: storeBookData,
  });
}

async function updateStoreBook(storeId, bookId, storeBookData) {
  return await prisma.storeBook.update({
    where: {
      storeId_bookId: {
        storeId,
        bookId,
      },
    },
    data: storeBookData,
  });
}

export {
  createStore,
  updateStore,
  createAuthor,
  createBook,
  updateBook,
  createStoreBook,
  updateStoreBook,
};
