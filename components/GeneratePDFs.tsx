"use client"
const GeneratePDFs = () => {
    const handleGeneratePDFs = async () => {
        try {
    
            const response = await fetch('/api/generate-all-pdfs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        
            if (!response.ok) {
                throw new Error(`Erro HTTP ${response.status}`);
            }

            console.log('Boletins gerados!')
        } catch (error: any) {
            console.error('Erro ao gerar o PDF:', error.message as string);
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