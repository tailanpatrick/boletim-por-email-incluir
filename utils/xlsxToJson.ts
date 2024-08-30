import * as XLSX from "xlsx";

async function xlsxToJson(xlsxFileBuffer: Buffer): Promise<any[]> {


  const workbook = XLSX.read(xlsxFileBuffer, {type: 'buffer'});
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Converte a planilha para JSON
  const json = XLSX.utils.sheet_to_json(sheet);
  return json;
}

export default xlsxToJson;
