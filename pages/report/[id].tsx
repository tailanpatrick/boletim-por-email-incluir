import { GetServerSideProps } from 'next';
import StudentData from '@/types/StudentData';
import ReportCardTemplate from '@/template/ReportCardTemplate';
import extractData from '@/utils/extractData';
import '@/app/globals.css';
import loadData from '@/utils/loadData';

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

 
  const data = await loadData();
  const students = extractData(data);

  const student = students.find(student => student.id === id && student.name) || null;

  return {
    props: {
      student,
    },
  };
};

export default ReportPage;
