import xlsxToJson from "@/utils/xlsxToJson";
import PDFViewer from "@/components/PDFViewer";

async function loadData() {

  const filePath = "public/Eletronica - 2 semestre.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

export default async function PDF() {
  return (
    <>
      <PDFViewer studentId={'7'}/>
  
    </>
  );
}
