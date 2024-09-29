"use client";
import { useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import Navbar from "@/components/Navbar";
import DownloadTemplate from "@/components/ui/DownloadTemplate";
import { toastSuccess, toastLoading, toastError, toastDismiss } from "@/components/ui/Toast";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showDownloadComponent, setShowDownloadComponent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    if (!selectedFile) {
      toastError("Por favor, selecione um arquivo.");
      return;
    }
  
    toastLoading('Aguarde enquantos os boletins são gerados ☕')
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/generate-all-pdfs", {
        method: "POST",
        body: formData,
      });


      if (!response.ok) {
        const errorResponse = await response.json();
        toastError(`Erro: ${errorResponse.error || 'Ocorreu um erro desconhecido'}`);
        return;
      }

      toastDismiss();
      toastSuccess('Boletins Gerados com sucesso.')
      
    } catch (error: any) {
      toastDismiss();
      toastError(`Erro de rede: ${error.message as string}`);
    } finally {
      
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-full items-center justify-center text-center gap-5 md:p-10">

        {showDownloadComponent && <DownloadTemplate />}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full w-full items-center gap-4"
        >
          <FileUpload onFileUpload={setSelectedFile} setShowDownloadComponent={setShowDownloadComponent} handleClickGenerateButton={handleSubmit} isLoading={isLoading} />

        </form>
      </div>
    </>

  );
}
