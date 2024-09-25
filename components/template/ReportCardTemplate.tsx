// src/template/ReportCardTemplate.tsx
import Image from "next/image";
import StudentData  from '@/types/StudentData';

const ReportCardTemplate: React.FC<{ student: StudentData }> = ({ student }) => {
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
                <p className="text-lg"><strong>Nome do Aluno:</strong> {student.name}</p>
                <p className="text-lg"><strong>Curso:</strong> {student.course}</p>
                <p className="text-lg"><strong>Semestre Letivo:</strong> {student.semester}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Frequência do Aluno</h2>
                <div className="flex flex-wrap gap-2">
                    {student.presence.map((entry: string[], index: number) => (
                        <div key={index} className="flex-1 min-w-[80px] bg-gray-100 text-center">
                            <span className="block bg-black text-white text-sm font-medium p-2">{entry[0]}</span>
                            <span className={`block ${entry[1] === 'P' ? 'text-gray-700' : 'text-red-700'} px-2 py-1`}>
                                {entry[1]}
                            </span>
                        </div>
                    ))}
                    <div className="flex-1 min-w-[80px] bg-gray-200 text-center font-semibold">
                        <span className="block bg-black text-white text-sm font-medium p-2">Presença Total (%)</span>
                        <span className="block text-gray-700 px-2 py-1">
                            {student.percentPresence.toFixed(2)} %
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Desempenho Acadêmico</h2>
                <div className="flex flex-wrap text-center">
                    <div className="min-w-full p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Curso</span>
                        <span className="block bg-gray-200 text-gray-700 px-2 font-semibold py-1">
                            {student.course}
                        </span>
                    </div>
                    <div className="min-w-[50%] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Nota</span>
                        <span className={`block bg-gray-200 px-2 py-1 font-semibold
                            ${student.totalPoints >= student.average ? 'text-green-600': 'text-red-600'}`
                        }>
                            {student.totalPoints}
                        </span>
                    </div>
                    <div className="min-w-[50%] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Média</span>
                        <span className="block bg-gray-200 text-gray-700 font-semibold px-2 py-1">
                            {student.average}
                        </span>
                    </div>
                    <div className="flex-1 min-w-full p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Situação</span>
                        <span className={`block ${student.status === 'Aprovado' ? 'text-green-600' : 'text-red-600'} bg-gray-200 font-semibold px-2 py-1`}>
                            {student.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReportCardTemplate;
