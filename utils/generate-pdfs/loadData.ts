import xlsxToJson from "./xlsxToJson";

export default async function loadData(xlsxFileBuffer: Buffer) {
    
    const data = await xlsxToJson(xlsxFileBuffer);
    return data;
}