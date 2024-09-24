import { NextRequest, NextResponse } from "next/server";
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import { ReportCardStatus } from "@prisma/client";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

interface EmailParams {
  recipients: string[];
  reportCard: Buffer;
  studentName: string;
  studentID: string;
}

class EmailTransporter {
  static createTransport() {
    return Nodemailer.createTransport(
      MailtrapTransport({
        token: "0a977a1af19c6545168a96655ff29997",
        testInboxId: 3125504,
      })
    );
  }
}

class EmailService {
  private tranport: any;
  private sender: { address: string; name: string };
  constructor() {
    this.tranport = EmailTransporter.createTransport();
    this.sender = {
      address: "mailtrap@example.com",
      name: "Mailtrap Test",
    };
  }
  async sendEmail({
    recipients,
    reportCard,
    studentName,
    studentID,
  }: EmailParams) {
    await this.tranport.sendMail({
      from: this.sender,
      to: recipients,
      subject: "Boletim Projeto Incluir",
      text: `Olá ${studentName}, segue em anexo seu boletim. Att projeto incluir`,
      category: "Integration Test",
      sandbox: true,
      attachments: [
        {
          filename: "boletim.pdf",
          content: reportCard,
          encoding: "base64",
        },
      ],
    });
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  const emailService = new EmailService();
  try {
    console.log("Request received at /api/send");
    const { students } = await req.json();
    const sendedEmailsList: string[] = [];
    for (const student of students) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); //limitação do api
      const reportCard = await prisma.student.findUnique({
        where: {
          id: student.id,
        },
        select: {
          reportCard: true,
          sendTryCount: true,
        },
      });
      if (reportCard?.reportCard) {
        await emailService.sendEmail({
          recipients: [student.email],
          reportCard: reportCard.reportCard,
          studentName: student.name,
          studentID: student.id,
        });
        await prisma.student.update({
          where: {
            id: student.id,
          },
          data: {
            reportCardSentStatus: ReportCardStatus.SENT,
            sendTryCount: reportCard.sendTryCount + 1,
          },
        });
        sendedEmailsList.push(student.email);
      } else {
        console.log(`No report card found for ${student.name}`);
      }
    }
    console.log(sendedEmailsList);
    return NextResponse.json({ message: "Emails sent", sendedEmailsList });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
