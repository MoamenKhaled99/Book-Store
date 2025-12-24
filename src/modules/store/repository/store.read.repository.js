import { getPrisma } from "../../../config/prisma.js";

const prisma = getPrisma();

async function findStoreById(storeId) {
  return await prisma.store.findUnique({
    where: { id: storeId },
  });
}

async function findTop5PriciestBooks(storeId) {
  const storeBooks = await prisma.storeBook.findMany({
    where: { 
      storeId: storeId,
      soldOut: false,
    },
    include: {
      book: {
        include: {
          author: true,
        },
      },
    },
    orderBy: {
      price: "desc",
    },
    take: 5,
  });

  return storeBooks.map((sb) => ({
    name: sb.book.name,
    author: sb.book.author.name,
    price: sb.price,
    pages: sb.book.pages,
  }));
}

async function findTop5ProlificAuthors(storeId) {
  const storeBooks = await prisma.storeBook.findMany({
    where: { 
      storeId: storeId,
      soldOut: false,
    },
    include: {
      book: {
        include: {
          author: true,
        },
      },
    },
  });

  const authorCounts = {};
  storeBooks.forEach((sb) => {
    const authorId = sb.book.author.id;
    const authorName = sb.book.author.name;

    if (!authorCounts[authorId]) {
      authorCounts[authorId] = {
        name: authorName,
        bookCount: 0,
      };
    }
    authorCounts[authorId].bookCount++;
  });

  const authors = Object.values(authorCounts)
    .sort((a, b) => b.bookCount - a.bookCount)
    .slice(0, 5);

  return authors;
}

export { findStoreById, findTop5PriciestBooks, findTop5ProlificAuthors };
