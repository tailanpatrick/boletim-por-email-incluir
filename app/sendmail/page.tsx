"use client";
import { sendContactForm } from "@/lib/api";

export default function Page() {
  const submit = async () => {
    sendContactForm();
    console.log("Enviado");
  };
  return (
    <>
      <button onClick={submit}>Send</button>
    </>
  );
}
