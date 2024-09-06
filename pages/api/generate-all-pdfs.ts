import type { NextApiResponse } from 'next';
import NextApiRequestWithFile from '@/types/NextApiRequestWithFIle';
import upload from '@/lib/multer'; 
import { generateAndSentAllPDFs } from '@/utils/generate-pdfs/generateAndSentAllPDFs';

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
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
      await generateAndSentAllPDFs(fileBuffer); 
      res.status(200).send('Boletins gerados e enviados com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar os boletins:', error);
      res.status(500).json({ error: 'Erro ao gerar os boletins' });
    }
  });
}
