import fs from 'fs/promises';
import path from 'path';

export default async function persistStudantsInJson(jsonData: any, filename: string) {
  try {
    // Define o caminho da pasta onde o arquivo JSON será salvo
    const folderPath = path.resolve(process.cwd(), 'data');

    console.log(folderPath);

    // Cria a pasta se ela não existir
    await fs.mkdir(folderPath, { recursive: true });

    // Define o caminho completo do arquivo JSON
    const filePath = path.join(folderPath, filename);

    // Converte o objeto JSON para uma string
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Grava a string JSON no arquivo especificado
    await fs.writeFile(filePath, jsonString);

    console.log(`JSON salvo com sucesso em: ${filePath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao salvar o JSON: ${error.message}`);
    } else {
      console.error(`Erro desconhecido ao salvar o JSON`);
    }
  }
}
