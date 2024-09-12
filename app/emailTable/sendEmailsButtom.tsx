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

        const updatedStudents = students.map((student) => {
          const emailSentStatus = result.sentEmails.includes(student.email);
          if (emailSentStatus) {
            return {
              ...student,
              reportCardSentStatus: "SENT",
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
      <div className="text-white">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Email</th>
              <th>Report Card Sent Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{student.email}</td>
                <td>{student.reportCardSentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSendEmails} disabled={isSending}>
          {isSending ? "Enviando emails..." : "Enviar emails para todos"}
        </button>
      </div>
    </>
  );
}

export default SendEmailsButton;
