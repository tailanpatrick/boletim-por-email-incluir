export const sendContactForm = async () =>
  fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  })
    .then(async (res) => {
      console.log("Response status:", res.status);
      const responseBody = await res.text(); // Capture o corpo da resposta como texto
      console.log("Response body:", responseBody); // Imprima o corpo da resposta

      if (!res.ok) throw new Error(`Failed to send message: ${responseBody}`);
      return JSON.parse(responseBody);
    })
    .catch((err) => {
      console.error("Error sending contact form:", err);
      throw err;
    });
