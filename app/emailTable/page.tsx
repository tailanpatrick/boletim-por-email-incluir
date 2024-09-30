import Navbar from "@/components/Navbar";
import SendEmailsButton from "./sendEmailsTable";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    select: {
      id: true,
      name: true,
      course: true,
      email: true,
      semester: true,
      reportCard: true,
      sendTryCount: true,
      reportCardSentStatus: true,
    },
  });

  // Mapeia os estudantes para adicionar reportCardBase64
  const modifiedStudents = students.map((student) => ({
    ...student,
    reportCard: null,
    reportCardBase64: Buffer.from(student.reportCard).toString("base64"), // Adiciona a versão Base64
  }));

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-3 md:p-20 w-full">
        {/* Passa modifiedStudents como props para o componente do cliente */}
        <SendEmailsButton initialStudents={modifiedStudents} />
      </div>
    </>
  );
}
