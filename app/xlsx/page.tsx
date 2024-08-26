// a ideia é só ver os dados em formato de tabela e ver como o json funfa com o xlsx
import xlsxToJson from "@/utils/xlsxToJson";
import path from "path";

// Função assíncrona que carrega os dados do Excel
async function loadData() {
  //const filePath = path.join(process.cwd(), "public", "Boletim_teste.xlsx");
  //console.log(filePath);
  const filePath = "c:/gp/boletim_email/public/Boletim_teste.xlsx";
  const data = await xlsxToJson(filePath);
  return data;
}

export default async function Home() {
  const data = await loadData();
  console.log(data);
  return (
    <>
      <h1>Boletim</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((col, index) => (
                <th key={index}>{col}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, idx) => (
                <td key={idx}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
