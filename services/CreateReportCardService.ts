import prismaClient from "@/lib/prisma-client";
import StudentData from "@/types/StudentData";

class CreateReportCardService {
    async execute(student: StudentData, pdfBuffer: Buffer) {
       
        if(!student.name || !pdfBuffer){
            throw new Error('Estudante e seu boletim não enviado')
        }

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
                reportCard: pdfBuffer
            }
        })

        return studentWithReportCard;
    }
}

export { CreateReportCardService }