import { NextApiRequest, NextApiResponse } from "next";

const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "2b904e0d376c23ecc4af10ddad237f5a";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3106459,
  })
);

const sender = {
  address: "mailtrap@example.com",
  name: "Mailtrap Test",
};
const recipients = ["srfulano@hotmail.com"];

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Request received at /api/send");
    await transport.sendMail({
      from: sender,
      to: recipients,
      subject: "You are awesome!",
      text: "Consegui fran!!",
      category: "Integration Test",
      sandbox: true,
    });
    return res.status(200).json({ message: "Email sent" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
