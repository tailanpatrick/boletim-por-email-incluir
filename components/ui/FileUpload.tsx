"use client";
import { useState } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

type FileUploadProps = {
  onFileUpload: (file: File) => void;
  acceptedTypes?: string;
  buttonLabel?: string;
  dropzoneText?: string;
};

export const FileUpload = ({
  onFileUpload,
  acceptedTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  buttonLabel = "Reset",
  dropzoneText = "Clique ou arraste para enviar",
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileEnter, setFileEnter] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFileName(file.name);
      onFileUpload(file); // Chama a função passada por props com o arquivo selecionado
    }
  };

  return (
    <div className="container px-4 max-w-5xl mx-auto">
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
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center rounded-lg cursor-pointer`}
        >
          <label
            htmlFor="file"
            className="h-full flex flex-col gap-3 justify-center items-center text-center"
          >
            <IoCloudUploadSharp className="text-5xl text-green-400" />
            {dropzoneText}
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            accept={acceptedTypes}
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                handleFileChange(files[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-lg">{fileName}</p>
          <button
            onClick={() => setFileName(null)}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
