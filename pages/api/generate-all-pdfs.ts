import type { NextApiRequest, NextApiResponse } from 'next';
import upload from '@/lib/multer'; // Importa a configuração do multer
import generateAllPDFs from '@/utils/generateAllPDFs';
import NextApiRequestWithFile from '@/types/NextApiRequestWithFIle';

// Configura o Next.js para não usar o analisador de corpo padrão
export const config = {
  api: {
    bodyParser: false, 
  },
};

export default function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
  // Usa o middleware de upload do multer
  upload.single('file')(req as any, res as any, async (err: any) => {
    if (err) {
      console.error('Erro ao fazer upload:', err);
      return res.status(500).json({ error: 'Erro ao fazer upload' });
    }

    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    try {
      // Chama a função generateAllPDFs, passando o buffer do arquivo
      await generateAllPDFs(fileBuffer);

      res.status(200).send('ok');
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      res.status(500).json({ error: 'Erro ao gerar o PDF' });
    }
  });
}
