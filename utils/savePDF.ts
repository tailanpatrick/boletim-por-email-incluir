import fs from 'fs/promises';
import path from 'path';

export default async function savePDF(pdfBuffer: Buffer, filename: string) {
  try {
    
    const folderPath = path.resolve(__dirname, 'pdfs');

    
    await fs.mkdir(folderPath, { recursive: true });

    
    const filePath = path.join(folderPath, filename+'.pdf');

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
