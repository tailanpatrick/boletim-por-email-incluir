import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.student.findMany({
    where: {
      reportCardSentStatus: "NOT_SENT",
    },
    select: {
      name: true,
      course: true,
      email: true,
      reportCardSentStatus: true,
    },
  });

  console.log(users);
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
