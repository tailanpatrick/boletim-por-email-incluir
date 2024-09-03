import fs from 'fs/promises';
import path from 'path';

async function readJson(filePath: string): Promise<any> {
  // Resolve o caminho absoluto do arquivo JSON
  const fullPath = path.resolve(filePath);

  try {
    // Lê o arquivo como texto
    const fileContent = await fs.readFile(fullPath, 'utf-8');

    // Parse o conteúdo do JSON e retorne-o
    return JSON.parse(fileContent);
  } catch (error) {
    // Verifica se o erro é uma instância de Error
    if (error instanceof Error) {
      console.error(`Erro ao ler o arquivo JSON: ${error.message}`);
    } else {
      console.error(`Erro desconhecido ao ler o arquivo JSON`);
    }
    throw error; // Repassa o erro para que possa ser tratado por quem chamou a função
  }
}

export default readJson;
