"use client";

import { useState } from "react";

function SendEmailsButton({ initialStudents }: { initialStudents: any[] }) {
  const [isSending, setIsSending] = useState(false);
  const [students, setStudents] = useState(initialStudents);

  const handleSendEmails = async () => {
    setIsSending(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ students }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        console.log(result.sendEmails, "oi");
        const updatedStudents = students.map((student) => {
          const emailSentStatus = result.sendEmails.includes(student.email);
          if (emailSentStatus) {
            return {
              ...student,
              reportCardSentStatus: "ENVIADO",
            };
          }
          return student;
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

  return (
    <>
      <div className="overflow-x-auto float-end rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="py-3 px-6 border border-gray-300">Name</th>
              <th className="py-3 px-6 border border-gray-300">Course</th>
              <th className="py-3 px-6 border border-gray-300">Email</th>
              <th className="py-3 px-6 border border-gray-300">
                Report Card Sent Status
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {students.map((student, index) => (
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
                  {student.email}
                </td>
                <td
                  className={`py-3 px-6 border border-gray-300 ${
                    student.reportCardSentStatus === "SENT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {student.reportCardSentStatus === "SENT"
                    ? "ENVIADO"
                    : "NÃO ENVIADO"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handleSendEmails}
          disabled={isSending}
          className={`mt-6 px-6 py-3 rounded-md text-white ${
            isSending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } shadow-lg border border-gray-300`}
        >
          {isSending ? "Enviando emails..." : "Enviar emails para todos"}
        </button>
      </div>
    </>
  );
}

export default SendEmailsButton;
