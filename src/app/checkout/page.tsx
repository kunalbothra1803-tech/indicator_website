"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock } from "lucide-react";
import Script from "next/script";

const PLANS = {
  trial: { name: "7-Day Trial", price: 999, amount: 99900 },
  monthly: { name: "Monthly Plan", price: 2999, amount: 299900 },
  quarterly: { name: "Quarterly Plan", price: 6999, amount: 699900 },
  lifetime: { name: "Lifetime Access", price: 19999, amount: 1999900 },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") as keyof typeof PLANS || "monthly";
  const selectedPlan = PLANS[planKey] || PLANS.monthly;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tvUsername: "",
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create order on our backend
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planKey,
          amount: selectedPlan.amount,
          ...formData,
        }),
      });
      const order = await res.json();

      if (!order.id) throw new Error("Failed to create order");

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "IPE PRO",
        description: selectedPlan.name,
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on our backend
          const verifyRes = await fetch("/api/webhook/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              customerData: { plan: planKey, ...formData },
            }),
          });
          
          if (verifyRes.ok) {
            window.location.href = "/success";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="container mx-auto px-4 md:px-6 py-32 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secure Checkout</h1>
          <p className="text-gray-400">Complete your purchase to get instant access.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Your Details</h2>
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required className="bg-white/5 border-white/10 text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required className="bg-white/5 border-white/10 text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <p className="text-xs text-gray-500">We'll send your confirmation here.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required className="bg-white/5 border-white/10 text-white" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tvUsername">TradingView Username</Label>
                <Input id="tvUsername" required className="bg-white/5 border-white/10 text-white" value={formData.tvUsername} onChange={(e) => setFormData({...formData, tvUsername: e.target.value})} />
                <p className="text-xs text-primary">Required to grant you access to the script.</p>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                {loading ? "Processing..." : `Pay ₹${selectedPlan.price}`}
                <Lock className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>

          {/* Summary Section */}
          <div>
            <div className="glass-card p-8 mb-6">
              <h2 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-300">IPE PRO Indicator</span>
                <span className="text-white font-medium">₹{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-sm">
                <span className="text-gray-500">Plan Selected</span>
                <span className="text-primary font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-white">₹{selectedPlan.price}</span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong className="block mb-1">Bank-Level Security</strong>
                Your payment information is securely processed by Razorpay. We do not store any of your credit card details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
