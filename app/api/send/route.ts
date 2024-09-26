import { NextRequest, NextResponse } from "next/server";
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import { ReportCardStatus } from "@prisma/client";
import prismaClient from "@/lib/prisma-client";

const prisma = prismaClient;

interface Email {
  recipients: string[];
  subject: string;
  text: string;
  attachments?: { filename: string; content: Buffer; encoding: string }[];
}

class ReportCardEmail implements Email {
  recipients: string[];
  subject: string;
  text: string;
  attachments: { filename: string; content: Buffer; encoding: string }[];

  constructor(studentName: string, reportCard: Buffer, recipients: string[]) {
    this.recipients = recipients;
    this.subject = "Boletim Projeto Incluir";
    this.text = `Olá ${studentName}, segue em anexo seu boletim. Att projeto incluir`;
    this.attachments = [
      {
        filename: "boletim.pdf",
        content: reportCard,
        encoding: "base64",
      },
    ];
  }
}
class EmailFactory {
  static createEmail(
    type: string,
    student: { name: string; email: string; id: string },
    reportCard?: Buffer
  ): Email {
    switch (type) {
      case "reportCard":
        if (!reportCard) throw new Error("Report Card is required");
        return new ReportCardEmail(student.name, reportCard, [student.email]);
      //coloque aqui mais tipos dps?
      default:
        throw new Error("Invalid email type");
    }
  }
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
  async sendEmail(email: Email) {
    await this.tranport.sendMail({
      from: this.sender,
      to: email.recipients,
      subject: email.subject,
      text: email.text,
      category: "Integration Test",
      sandbox: true,
      attachments: email.attachments,
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
      await new Promise((resolve) => setTimeout(resolve, 2000)); //limitação da API

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
        try {
          const email = EmailFactory.createEmail(
            "reportCard",
            student,
            reportCard.reportCard
          );
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
        } catch {
          await prisma.student.update({
            where: {
              id: student.id,
            },
            data: {
              reportCardSentStatus: ReportCardStatus.ERROR_SENT,
              sendTryCount: reportCard.sendTryCount + 1,
            },
          });
        }
      } else return Response.json({ message: "No report card found" });
    }
    console.log(sendedEmailsList);
    return NextResponse.json({ message: "Emails sent", sendedEmailsList });
  } catch (err: any) {
    return NextResponse.json({ message: err.message });
  }
}
