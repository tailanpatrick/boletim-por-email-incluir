import xlsxToJson from "@/utils/xlsxToJson";
import PDFViewer from "@/components/PDFViewer";
import GeneratePDFs from "@/components/GeneratePDFs";

async function loadData() {

  const filePath = "public/Eletronica - 2 semestre.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

export default async function PDF() {
  return (
    <div className="flex flex-col gap-3">
      <PDFViewer studentId={'4'}/>
      <GeneratePDFs/>
    </div>
  );
}
