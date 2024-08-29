import xlsxToJson from "./xlsxToJson";

export default async function loadData() {
    const filePath = "public/Eletronica - 2 semestre.xlsx";
    const data = await xlsxToJson(filePath);
    return data;
}