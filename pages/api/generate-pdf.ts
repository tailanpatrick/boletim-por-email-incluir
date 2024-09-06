import { NextApiRequest, NextApiResponse } from 'next';
import generatePDF from '@/utils/generate-pdfs/generatePDF';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const studentId: string = req.body;

            // Gere o PDF
            const pdfBuffer = await generatePDF(studentId);

            // Envie o PDF como resposta
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="report-card.pdf"');
            res.send(pdfBuffer);
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
            res.status(500).json({ error: 'Erro ao gerar o PDF' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
