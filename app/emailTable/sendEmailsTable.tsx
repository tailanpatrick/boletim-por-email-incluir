"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { TableStudentData } from "@/types/TableStudentData";
import ReportCardModal from "@/components/ui/ReportCardModal";

function SendEmailsButton({
  initialStudents,
}: {
  initialStudents: TableStudentData[];
}) {
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [selectedReportCardUrl, setSelectedReportCardUrl] = useState<
    string | null
  >(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const [localEmail, setLocalEmail] = useState<{ [key: string]: string }>({});

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      const studentsToSend = students.filter(
        (student) =>
          student.reportCardSentStatus === "NOT_SENT" &&
          student.sendTryCount < 4
        //esse filtro está ruim, por algum motivo não consigo colocar um || q funcione. gostaria de algo tipo ("NOT_SENT||"ERROR_SENT") && student.sendTryCount < 4
      );
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: studentsToSend }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        const updatedStudents = students.map((student: TableStudentData) => {
          const emailSentStatus = result.sendedEmailsList.includes(
            student.email
          );
          return {
            ...student,
            reportCardSentStatus: emailSentStatus
              ? "SENT"
              : student.reportCardSentStatus,
          };
        });

        setStudents(updatedStudents);
      } else {
        alert(
          result.message || "Erro ao enviar emails. Sou 'sendEmailsButton'."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar emails:", error);
      alert("Falha ao enviar emails.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendIndividualEmail = async (student: TableStudentData) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students: [student] }),
      });
      const result = await response.json();

      if (response.ok) {
        alert(`Email enviado para ${student.name}`);
      } else {
        alert(
          result.message ||
            "Erro ao enviar email. Sou 'handleSendIndividualEmail'."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      alert("Falha ao enviar email.");
    }
  };
  const handleViewReportCard = (student: TableStudentData) => {
    const reportCardUrl = `data:application/pdf;base64,${student.reportCardBase64}`;
    setSelectedReportCardUrl(reportCardUrl);
    setStudentName(student.name);
    setIsModalOpen(true);
  };
  const handleEmailLocalChange = (studentID: string, newEmail: string) => {
    setLocalEmail((prev) => ({ ...prev, [studentID]: newEmail }));
  };
  const handleEmailChange = async (studentID: string, newEmail: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentID) {
          return { ...student, email: newEmail };
        }
        return student;
      })
    );
    try {
      const response = await fetch("/api/updateEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: studentID, email: newEmail }),
      });
      const result = await response.json();
      if (!response.ok) {
        alert(
          result.message || "Erro ao atualizar email. Sou 'handleEmailChange'."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
      alert("Falha ao atualizar email.");
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-3 px-6 border border-gray-300">Name</th>
              <th className="py-3 px-6 border border-gray-300">Course</th>
              <th className="py-3 px-6 border border-gray-300">Semestre</th>
              <th className="py-3 px-6 border border-gray-300">Email</th>
              <th className="py-3 px-6 border border-gray-300">Ver Boletim</th>
              <th className="py-3 px-6 border border-gray-300">
                Email Send Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student: TableStudentData, index) => (
              <tr
                key={student.email}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-6 border border-gray-300">
                  {student.name}
                </td>
                <td className="py-3 px-6 border border-gray-300">
                  {student.course}
                </td>
                <td className="py-3 px-6 border border-gray-300">
                  {student.semester}
                </td>
                <td className="py-3 px-6 border border-gray-300">
                  <input
                    type="email"
                    value={localEmail[student.id] || student.email}
                    ref={emailInputRef}
                    onChange={(e) =>
                      handleEmailLocalChange(student.id, e.target.value)
                    }
                    onBlur={(e) => handleEmailChange(student.id, student.email)}
                    className="border border-gray-300 p-2"
                  />
                </td>
                <td
                  onClick={() => handleViewReportCard(student)}
                  className="flex justify-center items-center border py-2 border-gray-300 border-b-0 cursor-pointer"
                >
                  <Image
                    src="/static/img/pdf.png"
                    alt=""
                    title="Visualizar Boletim"
                    width={40}
                    height={50}
                  />
                </td>
                <td
                  className={`py-3 px-6 border border-gray-300 ${
                    student.reportCardSentStatus === "SENT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.sendTryCount < 4
                    ? student.reportCardSentStatus
                    : "Tentativas excedidas"}
                </td>
                <td className="py-3 px-6 border border-gray-300">
                  <button
                    onClick={() => handleSendIndividualEmail(student)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Enviar Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 bg-white py-4">
        <button
          onClick={handleSendEmails}
          disabled={isSending}
          className={`px-6 py-3 rounded-md text-white ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } shadow-lg border border-gray-300`}
        >
          {isSending ? "Enviando emails..." : "Enviar emails para todos"}
        </button>
      </div>

      <ReportCardModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        reportCardUrl={selectedReportCardUrl}
        studentName={studentName}
      />
    </>
  );
}

export default SendEmailsButton;
