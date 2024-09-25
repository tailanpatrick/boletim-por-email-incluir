"use client";
import { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';

type FileUploadProps = {
  onFileUpload: (file: File) => void;
  setShowDownloadComponent: (state: boolean) => void;
  handleClickGenerateButton: (event: React.MouseEvent<HTMLButtonElement>) => void;
  acceptedType?: string;
  buttonLabel?: string;
  dropzoneText?: string;
};

export const FileUpload = ({
  onFileUpload,
  setShowDownloadComponent,
  handleClickGenerateButton,
  acceptedType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  buttonLabel = "Gerar Boletins",
  dropzoneText = "Arraste Aqui ou Selecione a Planilha do seu Computador",
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type === acceptedType) {
      setFileName(file.name);
      onFileUpload(file);
      setShowDownloadComponent(false);
    } else {
      toast.error("O formato do arquivo deve ser Xlsx!", {
        style: { fontWeight: 'bold' },
        position: "top-right",
        autoClose: 5000,  
      });
    }
  };

  const handleRemoveFile = () => {
    setFileEnter(false);
    setFileName(null);
    setShowDownloadComponent(true);
  }

  return (
    <div className="container px-4 pt-10 md:pt-0 max-w-5xl mx-auto">
      <ToastContainer/>
      {!fileName ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={() => setFileEnter(false)}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const file = e.dataTransfer.files[0];
              handleFileChange(file);
            }
          }}
          className={`${fileEnter ? "border-4" : "border-2"
            } mx-auto bg-white flex flex-col w-full max-w-[654px] h-72 border-dashed border-gray-300 items-center justify-center rounded-lg`}
        >
          <label
            htmlFor="file"
            className="h-full w-full flex flex-col gap-3 justify-center items-center text-center cursor-pointer hover:bg-gray-100"
          >
            <IoCloudUploadSharp className="text-5xl text-orange-500 animate-pulse" />
            {dropzoneText}
            <span className="text-sm text-gray-500">Planilhas no formato XLSX</span>
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            accept={acceptedType}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                handleFileChange(files[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-[554px] pb-6 bg-white border border-gray-300 rounded-lg shadow-2xl shadow-gray-400">
          <div className="flex w-full relative items-center justify-center gap-3 mb-4 p-2 pt-4 border border-b-gray-300">
            <div className="flex-1 flex items-center justify-center gap-2">
              <p className="text-sm font-bold">Carregado com sucesso</p>
              <FaRegCheckCircle className="text-3xl border-sm" />
            </div>
            <div className="absolute right-3 md:right-7 cursor-pointer" onClick={handleRemoveFile}>
              <MdCancel className="text-red-500 text-4xl mb-2 hover:text-red-400" title="Remover carregamento de arquivo" />
            </div>

          </div>

          <div className="flex flex-col h-full w-full items-center justify-center">
            <Image src="static/img/xlsx.svg" className="w-20 h-32" alt="Planilha Xlsx" width={90} height={150} />
            <p className="text-md inline-block mb-16 font-bold">{fileName}</p>
            <button
              onClick={(event) => handleClickGenerateButton(event)}
              className="px-10 py-6 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
            >
              {buttonLabel}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
