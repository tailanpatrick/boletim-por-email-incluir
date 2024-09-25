import generatePDF from '@/utils/generate-pdfs/generatePDF';
import loadData from '@/utils/generate-pdfs/loadData';
import extractData from '@/utils/generate-pdfs/extractData';
import persistStudantsInJson from '@/utils/generate-pdfs/persistStudantsInJson';
import savePDF from '../savePDF';
import { CreateReportCardService } from '@/services/CreateReportCardService';

export async function generateAndSentAllPDFs(xlsxFileBuffer: Buffer) {
    const data = await loadData(xlsxFileBuffer);
    const students = extractData(data);
    await persistStudantsInJson(students, 'temp.json');
    
    const reportCardService = new CreateReportCardService();

    const promises = students.map(async (student)=> {
        if (!student) return;

        try {
            const pdf = await generatePDF(student.id);
    
            const result = await reportCardService.execute(student, pdf);

            if (result) {
                console.log(`Boletim gerado e salvo para ${student.name}`);
            }
        } catch (error: any) {
           
            console.error(`Erro ao gerar boletim para ${student.name}: ${error.message}`);
        }
    });
    
    Promise.all(promises);
}
