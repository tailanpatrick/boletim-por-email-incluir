import puppeteer from 'puppeteer';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReportCardTemplate from '@/template/ReportCardTemplate';
import StudentData from '@/types/StudentData';
import fs from 'fs';
import path from 'path';

async function generatePDF(studentId: StudentData): Promise<Buffer> {

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    const url = `http://localhost:3000/report/${studentId}`; // URL com slug

    await page.goto(url, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    

    await browser.close();
    
    return Buffer.from(pdfBuffer);
}

export default generatePDF;



