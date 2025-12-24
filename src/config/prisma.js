import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

let prisma;

function getPrisma() {
  if (!prisma) {
    const pool = new pg.Pool({ 
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '992001',
      database: 'Ovrac',
    });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}

export { getPrisma };
