import prismaClient from "@/lib/prisma-client";
import StudentData from "@/types/StudentData";

class CreateReportCardService {
    async execute(student: StudentData, pdfBuffer: Buffer) {
       
        if (!student.name || !pdfBuffer) {
            throw new Error('Estudante e seu boletim não enviado');
        }

        // Verifica quantos boletins o aluno já tem
        const existingReportCardsCount = await prismaClient.student.count({
            where: {
                email: student.email,
                name: student.name,
            },
        });

        if (existingReportCardsCount >= 2) {
            throw new Error('Aluno já possui boletins para dois cursos.');
        }

        // Normaliza o nome do curso (remove acentos)
        const normalizedCourse = student.course.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // Verifica se já existe boletim salvo para este curso
        const existingReportCardForCourse = await prismaClient.student.findFirst({
            where: {
                email: student.email,
                name: student.name,
                course: normalizedCourse,
            },
        });

        if (existingReportCardForCourse) {
            throw new Error(`Boletim já existente para o curso ${student.course}.`);
        }

        // Cria o boletim
        const studentWithReportCard = await prismaClient.student.create({
            data: {
                name: student.name,
                course: student.course,
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
