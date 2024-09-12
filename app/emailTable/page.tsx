import SendEmailsButton from "./sendEmailsButtom";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    where: {
      reportCardSentStatus: "NOT_SENT",
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
    <div>
      <h1>Students with Report Cards Not Sent</h1>
      {/* Passa students como props para o componente do cliente */}
      <SendEmailsButton initialStudents={students} />
    </div>
  );
}
