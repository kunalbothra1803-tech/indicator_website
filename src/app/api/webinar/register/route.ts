import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, whatsapp, webinarDate } = await req.json();

    if (!name || !email || !whatsapp || !webinarDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const parsedDate = new Date(webinarDate);

    // Save to DB
    const registrant = await prisma.webinarRegistrant.create({
      data: {
        name,
        email,
        whatsapp,
        webinarDate: parsedDate,
        sentWelcome: true, // We are attempting to send it right now
      },
    });

    // Send WhatsApp Welcome Message
    // You must create a template named 'webinar_registration_confirmation' in your Meta Dashboard
    // Example template body: "Hi {{1}}, you are successfully registered for the IPE PRO webinar on {{2}}! Save this number to receive the link."
    const dateString = parsedDate.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    await sendWhatsAppMessage(whatsapp, "webinar_registration_confirmation", "en", [
      {
        type: "body",
        parameters: [
          { type: "text", text: name },
          { type: "text", text: dateString },
        ],
      },
    ]);

    return NextResponse.json({ success: true, id: registrant.id });
  } catch (error) {
    console.error("Webinar Registration Error:", error);
    return NextResponse.json(
      { error: "Failed to register for webinar", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
