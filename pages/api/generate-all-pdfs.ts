import { NextApiRequest, NextApiResponse } from 'next';
import generatePDF from '@/utils/generatePDF';
import generateAllPDFs from '@/utils/generateAllPDFs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            
            await generateAllPDFs();
            res.send('ok')
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            res.status(500).json({ error: 'Erro ao gerar o PDF' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
