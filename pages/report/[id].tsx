import { GetServerSideProps } from 'next';
import StudentData from '@/types/StudentData';
import ReportCardTemplate from '@/template/ReportCardTemplate';
import readJson from '@/utils/generate-pdfs/readJson';
import path from 'path';
import '@/app/globals.css';

interface ReportProps {
  student: StudentData | null;
}

const ReportPage = ({ student }: ReportProps) => {
  if (!student) {
    return <p>Aluno não encontrado.</p>;
  }

  return (
    <>
    <ReportCardTemplate student={student} />
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const pathToJson = path.resolve(process.cwd(), 'data' , 'temp.json')
  
  const students: StudentData[] = await readJson(pathToJson);

  const student = students.find(student => student.id === id && student.name) || null;

  return {
    props: {
      student,
    },
  };
};

export default ReportPage;
