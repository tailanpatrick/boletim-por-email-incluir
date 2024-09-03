import { CreateReportCardService } from "@/services/CreateReportCardService";
import StudentData from "@/types/StudentData";

export async function saveStudentWithReportCard(student: StudentData, pdfBuffer: Buffer){
    const reportCardService = new CreateReportCardService();

    const studentWithReportCard = await reportCardService.execute(student, pdfBuffer); 

    return studentWithReportCard;
}