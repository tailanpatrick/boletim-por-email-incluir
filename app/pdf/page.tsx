import xlsxToJson from "@/utils/xlsxToJson";
import extractData from "@/utils/extractData";
import PDFViewer from "@/components/PDFViewer";
import StudentData  from '@/types/StudentData';

async function loadData() {

  const filePath = "public/Eletronica - 2 semestre.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

export default async function PDF() {
  return (
    <>
      <PDFViewer studentId={'4'}/>
  
    </>
  );
}
