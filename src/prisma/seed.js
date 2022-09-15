import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { encrypt } from "../graphql/resolvers/bcrytp.js";

const data = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: (await encrypt("@Password123")).toString(),
    username: "Alice",
    phone: "11111111111",
    address: "savar",
    role: "Admin",
    post: {
      create: [
        {
          title: "First Post",
          content: "First Post Content",
          username: "Alice",
        },
        {
          title: "Second Post",
          content: "Second Post Content",
          username: "Alice",
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    password: (await encrypt("@Password123")).toString(),
    username: "Nilu",
    phone: "99999999999",
    address: "savar",
    role: "Member",
    post: {
      create: [
        {
          title: "Third Post",
          content: "Third Post Content",
          username: "Nilu",
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    password: (await encrypt("@Password123")).toString(),
    username: "Mahmoud",
    phone: "88888888888",
    address: "dhaka",
    role: "Student",
    post: {
      create: [
        {
          title: "Fourth Post",
          content: "Fourth Post Content",
          username: "Mahmoud",
        },
      ],
    },
  },
];

async function main() {
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});
  console.log(`Start seeding...`);
  for (const u of data) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.ID}`);
  }
  console.log(`Seeding finished.`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
