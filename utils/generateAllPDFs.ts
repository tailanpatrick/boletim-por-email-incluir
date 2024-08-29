import StudentData from '@/types/StudentData';
import generatePDF from '@/utils/generatePDF';
import  loadData  from '@/utils/loadData';
import  extractData  from '@/utils/extractData';
import persistStudantsInJson from '@/utils/persistStudantsInJson';
import savePDF from './savePDF';

export default async function generateAllPDFs(){
    const data = await loadData();
    const students = extractData(data);
    await persistStudantsInJson(students, 'temp.json');

    for(const student of students){
        if(!student) continue;

        const pdf = await generatePDF(student.id);
        await savePDF(pdf, student.name.replace(/ /g, '_'));
    }
}