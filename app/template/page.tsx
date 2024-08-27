import React from 'react';
import Image from "next/image";

const TemplateBoletim = () => {
    return (
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg my-5 rounded-lg">

            <div className="flex items-center justify-start gap-3 border-b pb-4 mb-6">
                <div>
                    <Image src="/static/img/logo-incluir.png" width={65} height={100} alt="Incluir UFMG Logo" className="h-16"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Boletim Escolar</h1>
                    <p className="text-sm text-gray-600">Projeto Incluir UFMG</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-lg"><strong>Nome do Aluno:</strong> João Silva</p>
                <p className="text-lg"><strong>Curso:</strong> Informática Infantil</p>
                <p className="text-lg"><strong>Ano Letivo:</strong> 2024</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Frequência do Aluno</h2>
                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    {/* Frequência */}
                    {[
                        "06.04", "13.04", "20.04", "27.04", "04.05", "11.05", 
                        "18.05", "08.06", "15.06", "22.06", "29.06", "06.07"
                    ].map((date, index) => (
                        <div key={index} className="flex-1 min-w-[80px] bg-gray-200 text-center">
                            <span className="block bg-black text-white text-sm font-medium p-2">{date}</span>
                            <span className="block text-gray-700 px-2 py-1">P</span>
                        </div>
                    ))}
                    
                    {/* Presença Total */}
                    <div className="flex-1 min-w-[80px] bg-gray-300 text-center font-semibold lg:w-full">
                        <span className="block bg-black text-white text-sm font-medium p-2">Total</span>
                        <span className="block text-gray-700 px-2 py-1">12</span>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Desempenho Acadêmico</h2>
                <div className="flex flex-wrap">
                    <div className="min-w-[200px] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Curso</span>
                        <span className="block text-gray-700 px-2">Informática Infantil</span>
                    </div>
                    <div className="min-w-[100px] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Média</span>
                        <span className="block text-gray-700 px-2">8.5</span>
                    </div>
                    <div className="min-w-[100px] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Nota</span>
                        <span className="block text-gray-700 px-2">8.5</span>
                    </div>
                    <div className="flex-1 min-w-[150px] p-2 border-b">
                        <span className="block bg-black text-white text-sm font-medium p-2">Situação</span>
                        <span className="block text-green-600 font-semibold px-2">Aprovado</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TemplateBoletim;
