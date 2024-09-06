import fs from 'fs/promises';
import path from 'path';

export default async function savePDF(pdfBuffer: Buffer, filename: string) {
  try {
    // Define o caminho da pasta onde o arquivo PDF será salvo
    const folderPath = path.resolve(__dirname, 'pdfs');

    // Cria a pasta se ela não existir
    await fs.mkdir(folderPath, { recursive: true });

    // Define o caminho completo do arquivo PDF
    const filePath = path.join(folderPath, filename+'.pdf');

    // Grava o buffer diretamente no arquivo especificado
    await fs.writeFile(filePath, pdfBuffer);

    console.log(`PDF salvo com sucesso em: ${filePath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Erro ao salvar o PDF: ${error.message}`);
    } else {
      console.error(`Erro desconhecido ao salvar o PDF`);
    }
  }
}
