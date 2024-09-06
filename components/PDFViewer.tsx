"use client"
import React from 'react';

const PDFViewer: React.FC<{ studentId: string }> = ({ studentId }) => {
    const handleView = async () => {
        try {
            // Solicita o PDF da API
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentId),
            });

            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}`);
            }

            // Obtém o Blob do PDF
            const pdfBlob = await response.blob();

            // Cria um URL para o Blob do PDF
            const url = window.URL.createObjectURL(pdfBlob);

            // Abre o PDF em uma nova aba
            window.open(url, '_self');
        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        }
    };

    return (
        <button onClick={handleView} className="btn btn-primary text-white">
            Ver Relatório
        </button>
    );
};

export default PDFViewer;
