import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // Basic security to ensure only our cron service can trigger this
    const url = new URL(req.url);
    const token = url.searchParams.get("token");
    if (token !== process.env.CRON_SECRET && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    
    // Calculate time windows
    // 24 hours from now
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    // 15 minutes from now
    const fifteenMinsFromNow = new Date(now.getTime() + 15 * 60 * 1000);

    // We allow a small buffer (e.g., 5 mins) to account for cron polling intervals
    const buffer = 5 * 60 * 1000; 

    // --- 1. Find and process 24-Hour Reminders ---
    const oneDayRegistrants = await prisma.webinarRegistrant.findMany({
      where: {
        sentOneDay: false,
        webinarDate: {
          gte: new Date(twentyFourHoursFromNow.getTime() - buffer),
          lte: new Date(twentyFourHoursFromNow.getTime() + buffer),
        },
      },
    });

    for (const user of oneDayRegistrants) {
      const success = await sendWhatsAppMessage(user.whatsapp, "webinar_reminder_24h", "en", [
        {
          type: "body",
          parameters: [
            { type: "text", text: user.name },
          ],
        },
      ]);
      if (success) {
        await prisma.webinarRegistrant.update({
          where: { id: user.id },
          data: { sentOneDay: true },
        });
      }
    }

    // --- 2. Find and process 15-Minute Reminders ---
    const fifteenMinRegistrants = await prisma.webinarRegistrant.findMany({
      where: {
        sentFifteenMin: false,
        webinarDate: {
          gte: new Date(fifteenMinsFromNow.getTime() - buffer),
          lte: new Date(fifteenMinsFromNow.getTime() + buffer),
        },
      },
    });

    for (const user of fifteenMinRegistrants) {
      const success = await sendWhatsAppMessage(user.whatsapp, "webinar_reminder_15m", "en", [
        {
          type: "body",
          parameters: [
            { type: "text", text: user.name },
            { type: "text", text: "https://zoom.us/your-webinar-link" }, // Replace with real zoom link
          ],
        },
      ]);
      if (success) {
        await prisma.webinarRegistrant.update({
          where: { id: user.id },
          data: { sentFifteenMin: true },
        });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed24h: oneDayRegistrants.length,
      processed15m: fifteenMinRegistrants.length
    });

  } catch (error) {
    console.error("Cron Error:", error);
    return NextResponse.json({ error: "Cron execution failed" }, { status: 500 });
  }
}
