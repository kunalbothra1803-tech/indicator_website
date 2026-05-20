// src/lib/whatsapp.ts

export async function sendWhatsAppMessage(to: string, templateName: string, templateLanguage: string = "en", components: any[] = []) {
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;

  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.warn("WhatsApp API keys missing. Skipping message send.");
    return false;
  }

  // Format the 'to' number (strip +, spaces, etc.)
  const formattedTo = to.replace(/[^0-9]/g, "");

  const payload = {
    messaging_product: "whatsapp",
    to: formattedTo,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: templateLanguage,
      },
      components: components,
    },
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API Error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    return false;
  }
}
