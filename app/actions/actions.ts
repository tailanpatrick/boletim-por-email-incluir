"use server";

const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

export async function sendEmail(formData: FormData) {
  "use server";
  const TOKEN = process.env.TEST_TOKEN;
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
  await transport.sendMail({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: formData.get("name") as string,
    category: "Integration Test",
    sandbox: true,
  });
}
