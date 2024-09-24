import { LiaBuyNLarge } from "react-icons/lia";
import Button from "./Button";

const DownloadTemplate = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'static/templatexlsx/[Curso] - [Semestre].xlsx';
        link.download = '[Curso] - [Semestre].xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return ( <div className="flex flex-col items-center">
        <p className="py-2 pt-8 font-bold">Não possui o template? Faça o Download do Template da Planilha</p>

        <Button loading={false} onClick={handleDownload}>Download do Template</Button>

        <p className="pt-12 pb-3 font-bold">Já possui a planilha padronizada?</p>
    </div> );
}
 
export default DownloadTemplate;