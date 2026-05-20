import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (password !== (process.env.ADMIN_PASSWORD || "admin123")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });

    const registrants = await prisma.webinarRegistrant.findMany({
      orderBy: { registeredAt: "desc" },
    });

    return NextResponse.json({ success: true, customers, registrants });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
