import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "dummy_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_key_secret",
});

export async function POST(req: Request) {
  try {
    const { amount, plan, name, email, phone, tvUsername } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amount, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan,
        name,
        email,
        phone,
        tvUsername,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
