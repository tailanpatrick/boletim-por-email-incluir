import { NextRequest, NextResponse } from "next/server";
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import { ReportCardStatus } from "@prisma/client";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: "0a977a1af19c6545168a96655ff29997",
    testInboxId: 3125504,
  })
);

const sender = {
  address: "mailtrap@example.com",
  name: "Mailtrap Test",
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("Request received at /api/send");
    const { students } = await req.json();
    const sendEmails = [];

    //for (const student of students) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const recipients = [students[0].email];

    const reportCard = await prisma.student.findUnique({
      where: {
        id: students[0].id,
      },
      select: {
        reportCard: true,
      },
    });

    if (reportCard) {
      try{
        
        await transport.sendMail({
          from: sender,
          to: recipients,
          subject: "Boletim Projeto Incluir",
          text: `Olá ${students[0].name}, segue em anexo seu boletim. Att projeto incluir`,
          category: "Integration Test",
          sandbox: true,
          attachments: [
            {
              filename: "boletim.pdf",
              content: reportCard.reportCard,
              enconding: "base64",
            },
          ],
        });
  
        await prisma.student.update({
          where: {
            id: students[0].id,
          },
          data: {
            reportCardSentStatus: ReportCardStatus.SENT,
          },
        });
        sendEmails.push(students[0].email);
      } catch(e){

        // reunião com Matheus
        await prisma.student.update({
          where: {
            id: students[0].id,
          },
          data: {
            reportCardSentStatus: ReportCardStatus.ERROR_SENT,
          },
        });
      }
    } else return Response.json({ message: "No report card found" });

    // //}
    console.log(sendEmails);
    return NextResponse.json({ message: "Email sent", sendEmails: sendEmails });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
