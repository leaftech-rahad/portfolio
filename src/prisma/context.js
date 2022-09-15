import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const context = {
  prisma: prisma,
};

export default context;
