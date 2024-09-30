import fs from 'fs/promises';
import path from 'path';

export default async function persistStudantsInJson(jsonData: any, filename: string) {
  try {
    const folderPath = path.resolve(process.cwd(), 'data');

    
    await fs.mkdir(folderPath, { recursive: true });

    const filePath = path.join(folderPath, filename);

    const jsonString = JSON.stringify(jsonData, null, 2);

    await fs.writeFile(filePath, jsonString);

   
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao salvar o JSON: ${error.message}`);
    } else {
      console.error(`Erro desconhecido ao salvar o JSON`);
    }
  }
}
