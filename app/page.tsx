"use client";
import { useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import Navbar from "@/components/Navbar";
import DownloadTemplate from "@/components/ui/DownloadTemplate";
import Button from "@/components/ui/Button";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDownloadComponent, setShowDownloadComponent] = useState(true);

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
    <>
      <Navbar/>

      <div className="flex flex-col h-full items-center justify-center text-center gap-5 md:p-10">

      {showDownloadComponent && <DownloadTemplate/>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full w-full items-center gap-4"
        >
          <FileUpload onFileUpload={setSelectedFile} setShowDownloadComponent={setShowDownloadComponent} handleClickGenerateButton={handleSubmit}/>

        </form>
      </div>
    </>

  );
}
