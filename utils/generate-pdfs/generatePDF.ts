const puppeteer = require("puppeteer");

async function generatePDF(studentId: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const url = `http://localhost:3000/report/${studentId}`;

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const pdfBuffer = await page.pdf({
    printBackground: true,
    format: "A4",
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}

export default generatePDF;
