import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      customerData,
    } = body;

    // 1. Verify Razorpay signature
    const secret = process.env.RAZORPAY_KEY_SECRET || "dummy_key_secret";
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Calculate expiry based on plan
    const now = new Date();
    let expiresAt = new Date();
    if (customerData.plan === "trial") expiresAt.setDate(now.getDate() + 7);
    else if (customerData.plan === "monthly") expiresAt.setMonth(now.getMonth() + 1);
    else if (customerData.plan === "quarterly") expiresAt.setMonth(now.getMonth() + 3);
    else if (customerData.plan === "lifetime") expiresAt.setFullYear(now.getFullYear() + 99);

    // 2. Save customer to Database using Prisma
    try {
      await prisma.customer.create({
        data: {
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          tradingviewUsername: customerData.tvUsername,
          plan: customerData.plan,
          paymentId: razorpay_payment_id,
          paymentStatus: "success",
          accessGranted: false,
          expiresAt: expiresAt,
        },
      });
    } catch (dbError) {
      console.error("Prisma Database Error:", dbError);
    }

    // 3. Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: "IPE PRO <support@yourdomain.com>",
        to: customerData.email,
        subject: "Welcome to IPE PRO - Next Steps",
        html: `
          <h1>Welcome, ${customerData.name}!</h1>
          <p>Thank you for purchasing the ${customerData.plan} plan for the Institutional Precision Engine PRO.</p>
          <p>We are processing your TradingView username: <strong>${customerData.tvUsername}</strong></p>
          <p>You will receive access to the script within the next few hours. You can find it under the "Invite-Only Scripts" section in TradingView indicators.</p>
          <br/>
          <p>If you have any questions, reply to this email or contact kunalbothra318@gmail.com.</p>
        `,
      });
    } catch (emailError) {
      console.error("Resend Error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
