import StudentData from '@/types/StudentData';
import generatePDF from '@/utils/generate-pdfs/generatePDF';
import  loadData  from '@/utils/generate-pdfs/loadData';
import  extractData  from '@/utils/generate-pdfs/extractData';
import persistStudantsInJson from '@/utils/generate-pdfs/persistStudantsInJson';
import savePDF from '../savePDF';
import { saveStudentWithReportCard } from '@/utils/persist-studant-and-pdf/saveStudentWithReportCard';

export async function generateAndSentAllPDFs(xlsxFileBuffer: Buffer){
    const data = await loadData(xlsxFileBuffer);
    const students = extractData(data);
    await persistStudantsInJson(students, 'temp.json');

    for(const student of students){
        if(!student) continue;

        const pdf = await generatePDF(student.id);
        await savePDF(pdf, student.name.replace(/ /g, '_'));
        await saveStudentWithReportCard(student, pdf);

    }
}