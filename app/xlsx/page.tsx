
import xlsxToJson from "@/utils/xlsxToJson";
import Image from "next/image";


// Função assíncrona que carrega os dados do Excel
async function loadData() {

  const filePath = "public/Boletim_teste.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

export default async function Home() {
  const data = await loadData();
  
  return (
    <div className="max-w-[400px] mx-auto p-8 bg-white shadow-lg my-5 rounded-lg">
        <div className="flex items-center justify-start gap-3 border-b pb-4 mb-6">
            <div>
                <Image
                    src="/static/img/logo-incluir.png"
                    width={65}
                    height={100}
                    alt="Incluir UFMG Logo"
                    className="h-16"
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Boletim Escolar</h1>
                <p className="text-sm text-gray-600">Programa Incluir</p>
            </div>
        </div>

        <div className="mb-6">
            <p className="text-lg"><strong>Nome do Aluno:</strong> {data[4].name}</p>
            <p className="text-lg"><strong>Curso:</strong> Nada</p>
            <p className="text-lg"><strong>Semestre Letivo:</strong> Nada</p>
        </div>

        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Frequência do Aluno</h2>
          
        </div>

        <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Desempenho Acadêmico</h2>
            <div className="flex flex-wrap text-center">
                <div className="min-w-full p-2 border-b">
                    <span className="block bg-black text-white text-sm font-medium p-2">Curso</span>
                    <span className="block bg-gray-100 text-gray-700 px-2 font-semibold py-1">
                        NAda
                    </span>
                </div>
                <div className="min-w-[50%] p-2 border-b">
                    <span className="block bg-black text-white text-sm font-medium p-2">Nota</span>
                    <span className="block bg-gray-100 text-gray-700 px-2 py-1 font-semibold">
                        {data[4].totalPoints}
                    </span>
                </div>
                <div className="min-w-[50%] p-2 border-b">
                    <span className="block bg-black text-white text-sm font-medium p-2">Média</span>
                    <span className="block bg-gray-100 text-gray-700 px-2 py-1">
                        
                    </span>
                </div>
                <div className="flex-1 min-w-full p-2 border-b">
                    <span className="block bg-black text-white text-sm font-medium p-2">Situação</span>
                    <span className={`block ${data[4].status === 'Aprovado' ? 'text-green-600' : 'text-red-600'} font-semibold px-2 py-1`}>
                        {data[4].status}
                    </span>
                </div>
            </div>
        </div>
    </div>
);
}
