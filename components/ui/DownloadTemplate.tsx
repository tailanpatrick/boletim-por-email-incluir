import Button from "./Button";

const DownloadTemplate = () => {
    return ( <div className="flex flex-col items-center">
        <p className="py-2 pt-8 font-bold">Não possui o template? Faça o Download do Template da Planilha</p>

        <Button loading={false} onClick={()=> {}}>Download do Template</Button>

        <p className="pt-12 pb-3 font-bold">Já possui a planilha padronizada?</p>
    </div> );
}
 
export default DownloadTemplate;