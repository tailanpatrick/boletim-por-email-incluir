import { GetServerSideProps } from 'next';
import StudentData from '@/types/StudentData';
import ReportCardTemplate from '@/template/ReportCardTemplate';
import extractData from '@/utils/extractData';
import xlsxToJson from '@/utils/xlsxToJson';

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

  return <ReportCardTemplate student={student} />;
};

// Função para buscar os dados com base no parâmetro da URL
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Carregar e extrair os dados da planilha
  const data = await loadData();
  const students = extractData(data);

  // Log para verificar o ID e a lista de alunos
  console.log('ID solicitado:', id);
  console.log('Alunos:', students);

  // Verificar se o ID passado corresponde ao índice de algum aluno
  const student = students.find(student => student.id === id && student.name) || null;

  return {
    props: {
      student,
    },
  };
};

export default ReportPage;
