import { GetServerSideProps } from 'next';
import StudentData from '@/types/StudentData';
import ReportCardTemplate from '@/template/ReportCardTemplate';
import extractData from '@/utils/extractData';
import xlsxToJson from '@/utils/xlsxToJson';
import '@/app/globals.css';

interface ReportProps {
  student: StudentData | null;
}

async function loadData() {
  const filePath = "public/Eletronica - 2 semestre.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

const ReportPage = ({ student }: ReportProps) => {
  if (!student) {
    return <p>Aluno não encontrado.</p>;
  }

  return (
    <>
    <h1 className="bg-red-500">12</h1>
    <ReportCardTemplate student={student} />
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

 
  const data = await loadData();
  const students = extractData(data);


  console.log('ID solicitado:', id);
  console.log('Alunos:', students);


  const student = students.find(student => student.id === id && student.name) || null;

  return {
    props: {
      student,
    },
  };
};

export default ReportPage;
