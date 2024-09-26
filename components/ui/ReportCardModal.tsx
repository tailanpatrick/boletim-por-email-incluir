// src/components/ui/ReportCardModal.tsx

import React from 'react';
import Modal from 'react-modal';
import { FaWindowClose } from "react-icons/fa";

interface ReportCardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  reportCardUrl: string | null;
  studentName: string | null;
}

const ReportCardModal: React.FC<ReportCardModalProps> = ({ isOpen, onRequestClose, reportCardUrl, studentName }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="p-0 h-full">
      <div className="flex justify-between items-center bg-orange-400 text-white font-bold shadow-sm w-full p-2 px-8">
        <h2 className="py-2">Visualização de Boletim de {studentName}</h2>
        <button onClick={onRequestClose}
          className='text-red-500 text-4xl bg-white p-1/2 rounded-lg'>
          <FaWindowClose />
        </button>
      </div>

      {reportCardUrl ? (
        <iframe
          src={reportCardUrl}
          className="w-full h-full border-0"
        ></iframe>
      ) : (
        <p>Nenhum boletim disponível para visualização.</p>
      )}
    </Modal>
  );
};

export default ReportCardModal;
