"use client"
const GeneratePDFs = () => {
    const handleGeneratePDFs = async () => {
        try {
            // Solicita o PDF da API
            const response = await fetch('/api/generate-all-pdfs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
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
    }
    return ( 
        <button 
        onClick={handleGeneratePDFs}
        className="bg-green-400 p-4 rounded-sm"
        >
        Gerar todos PDFs
        </button>
     );
}
 
export default GeneratePDFs;