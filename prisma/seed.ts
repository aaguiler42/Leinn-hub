import { PrismaClient } from "@prisma/client";
import companies from "./data/companies.json";

const prisma = new PrismaClient();

async function main() {
  for await (const company of companies) {
    await prisma.company.create({
      data: {
        name: company.company.name,
        contributions: {
          createMany: {
            data: company.contributions,
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: any) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
