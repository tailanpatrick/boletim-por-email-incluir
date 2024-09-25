import Navbar from "@/components/Navbar";
import SendEmailsButton from "./sendEmailsTable";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    where: {
      reportCardSentStatus: "NOT_SENT",
      sendTryCount: {
        lt: 4,
      },
    },
    select: {
      id: true,
      name: true,
      course: true,
      email: true,
      reportCardSentStatus: true,
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-3 md:p-20 w-full">
        {/* Passa students como props para o componente do cliente */}
        <SendEmailsButton initialStudents={students} />
      </div>
    </>
  );
}
