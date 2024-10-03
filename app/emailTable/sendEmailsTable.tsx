"use client";

import { useState } from "react";
import Image from "next/image";
import { TableStudentData } from "@/types/TableStudentData";
import ReportCardModal from "@/components/ui/ReportCardModal";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toastError, toastSuccess } from "@/components/ui/Toast";
import { ReportCardStatus } from "@prisma/client";

function SendEmailsButton({ initialStudents }: { initialStudents: TableStudentData[] }) {
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [selectedReportCardUrl, setSelectedReportCardUrl] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<string>("");

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      const studentsToSend = students.filter(
        (student) =>
          (student.reportCardSentStatus === "NOT_SENT" || student.reportCardSentStatus === "ERROR_SENT") &&
          student.sendTryCount < 4
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
        toastSuccess("Emails enviados");
        const updatedStudents = students.map((student: TableStudentData) => {
          const emailSentStatus = result.sendedEmailsList.includes(student.email);
          return {
            ...student,
            reportCardSentStatus: emailSentStatus ? "SENT" : student.reportCardSentStatus,
          };
        });

        setStudents(updatedStudents);
      } else {
        toastError(result.message || "Erro ao enviar emails. Sou 'sendEmailsButton'.");
      }
    } catch (error) {
      console.error("Erro ao enviar emails:", error);
      toastError("Falha ao enviar emails.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendIndividualEmail = async (
    student: TableStudentData,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonEmail = e.currentTarget as HTMLButtonElement;
    buttonEmail.disabled = true;
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
        setStudents(students.map((actualStudent) =>
          actualStudent.id === student.id
            ? { ...actualStudent, reportCardSentStatus: "SENT" }
            : actualStudent
        ));
        toastSuccess(`Email enviado para ${student.name}`);
      } else {
        toastError(result.message || "Erro ao enviar email. Sou 'handleSendIndividualEmail'.");
      }
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      toastError("Falha ao enviar email.");
    } finally {
      buttonEmail.disabled = false;
    }
  };


  const handleViewReportCard = (student: TableStudentData) => {
    const reportCardUrl = `data:application/pdf;base64,${student.reportCardBase64}`;
    setSelectedReportCardUrl(reportCardUrl);
    setStudentName(student.name);
    setIsModalOpen(true);
  };

  const handleEmailChange = async (studentID: string, newEmail: string) => {
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
        toastError(result.message || "Erro ao atualizar email. Sou 'handleEmailChange'.");
      }
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
      toastError("Falha ao atualizar email.");
    }
  };

  const startEditing = (studentID: string, currentEmail: string) => {
    setEditingEmail(studentID);
    setEmailValue(currentEmail);
  };

  const confirmEdit = (student: TableStudentData) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((s) =>
        s.id === student.id ? { ...s, email: emailValue } : s
      );

      return updatedStudents;
    });

    handleEmailChange(student.id, emailValue);
    setEditingEmail(null);
  };


  const cancelEdit = () => {
    setEditingEmail(null);
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
              <th className="py-3 px-6 border border-gray-300">Email Send Status</th>
              <th className="py-3 px-6 border border-gray-300">Envio Individual</th>

            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student: TableStudentData, index) => (
              <tr key={student.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                <td className="py-3 px-6 border border-gray-300">{student.name}</td>
                <td className="py-3 px-6 border border-gray-300">{student.course}</td>
                <td className="py-3 px-6 border border-gray-300">{student.semester}</td>
                <td className="py-3 px-6 border border-gray-300">
                  {editingEmail === student.id ? (
                    <div className="flex items-center">
                      <input
                        type="email"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                        className="border border-gray-300 p-2 mr-5"
                      />
                      <FaCheck onClick={() => confirmEdit(student)} className="cursor-pointer text-green-600 text-xl mx-3" />
                      <FaTimes onClick={cancelEdit} className="cursor-pointer text-red-600 text-xl" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="px-4">{student.email}</span>
                      {student.reportCardSentStatus === "SENT" || student.reportCardSentStatus && (
                        <FaEdit
                          onClick={() => startEditing(student.id, student.email)}
                          className="cursor-pointer text-xl ml-2 text-blue-600"
                        />
                      )}
                    </div>
                  )}
                </td>
                <td
                  onClick={() => handleViewReportCard(student)}
                  className="flex justify-center items-center border py-2 border-gray-300 border-b-0 cursor-pointer"
                >
                  <Image src="/static/img/pdf.png" alt="Visualizar Boletim" title="Visualizar Boletim" width={40} height={50} />
                </td>
                <td className={`py-3 px-6 border border-gray-300 ${student.reportCardSentStatus === "SENT" ? "text-green-600" : "text-red-600"}`}>
                  {student.sendTryCount < 4 ? student.reportCardSentStatus : "Tentativas excedidas"}
                </td>
                <td className="py-3 px-6 border border-gray-300">
                  <button
                    onClick={(e) => handleSendIndividualEmail(student, e)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
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
          className={`px-6 py-3 rounded-md text-white ${isSending ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"} shadow-lg border border-gray-300`}
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
