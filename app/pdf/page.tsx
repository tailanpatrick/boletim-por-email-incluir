"use client";
import { useState } from "react";
import PDFViewer from "@/components/PDFViewer";
import GeneratePDFs from "@/components/GeneratePDFs";
import FileUpload from "@/components/ui/FileUpload";

export default function PDF() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Por favor, selecione um arquivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/generate-all-pdfs", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) {
        const errorResponse = await response.json();
        alert(`Erro: ${errorResponse.error || 'Ocorreu um erro desconhecido'}`);
        return;
      }

      alert("Boletins gerados e enviados com sucesso!");
    } catch (error: any) {
      
      alert(`Erro de rede: ${error.message as string}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-20">
      {/* <PDFViewer studentId={'4'} />
      <GeneratePDFs /> */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4"
      >
        <FileUpload onFileUpload={setSelectedFile} />
        <button type="submit" className="bg-white flex-1 p-4 rounded-md">
          Gerar Boletins
        </button>
      </form>
    </div>
  );
}
