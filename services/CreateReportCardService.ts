import prismaClient from "@/lib/prisma-client";
import StudentData from "@/types/StudentData";

class CreateReportCardService {
    async execute(student: StudentData, pdfBuffer: Buffer) {
        if (!student.name || !pdfBuffer) {
            throw new Error('Estudante e boletim não enviado.');
        }

        // Normaliza o nome do curso para remover acentos apenas para a verificação
        const normalizedCourse = student.course.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        
        const existingReportCards = await prismaClient.student.findMany({
            where: {
                email: student.email,
                name: student.name,
            },
        });

        // Verifica se já existe boletim salvo para o curso removendo acentos na comparação
        const courseExists = existingReportCards.some((reportCard) => {
            const normalizedStoredCourse = reportCard.course.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalizedStoredCourse === normalizedCourse;
        });

        if (courseExists) {
            throw new Error(`Boletim já existente para o curso ${student.course}.`);
        }

 
        if (existingReportCards.length >= 2) {
            throw new Error('Aluno já possui boletins para dois cursos.');
        }

        const studentWithReportCard = await prismaClient.student.create({
            data: {
                name: student.name,
                course: student.course, // Armazena o curso com acentos
                semester: student.semester,
                presence: student.presence,
                percentPresence: student.percentPresence,
                totalPoints: student.totalPoints,
                average: student.average,
                status: student.status,
                email: student.email,
                reportCard: pdfBuffer,
            },
        });

        return studentWithReportCard;
    }
}

export { CreateReportCardService };
