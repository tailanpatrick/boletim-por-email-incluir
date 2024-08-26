import * as XLSX from "xlsx";
import path from "path";
import fs from "fs/promises";

async function xlsxToJson(filePath: string): Promise<any[]> {
  // Resolve o caminho absoluto do arquivo
  const fullPath = path.resolve(filePath);

  // Lê o arquivo como buffer
  const fileBuffer = await fs.readFile(fullPath);

  // Lê o buffer usando xlsx
  const workbook = XLSX.read(fileBuffer);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Converte a planilha para JSON
  const json = XLSX.utils.sheet_to_json(sheet);
  return json;
}

export default xlsxToJson;
