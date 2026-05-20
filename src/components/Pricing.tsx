"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Pricing() {
  const plans = [
    {
      name: "7-Day Trial",
      price: "₹999",
      period: "for 7 days",
      features: ["Full indicator access", "Setup video tutorial", "Email support"],
      popular: false,
      href: "/checkout?plan=trial",
    },
    {
      name: "Monthly",
      price: "₹2,999",
      period: "per month",
      features: ["Full indicator access", "Future updates", "Priority support"],
      popular: false,
      href: "/checkout?plan=monthly",
    },
    {
      name: "Quarterly",
      price: "₹6,999",
      period: "per quarter",
      features: ["Full indicator access", "Save more (₹2k discount)", "Priority support"],
      popular: true,
      href: "/checkout?plan=quarterly",
    },
    {
      name: "Lifetime",
      price: "₹19,999",
      period: "one-time payment",
      features: ["Lifetime indicator access", "Lifetime updates included", "VIP 1-on-1 support"],
      popular: false,
      href: "/checkout?plan=lifetime",
    },
  ];

  return (
    <section id="pricing" className="py-24 relative bg-black border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Choose Your <span className="text-gradient-primary">Edge</span></h2>
          <p className="text-gray-400 text-lg">
            Stop guessing and start trading with precision. Select the plan that fits your trading style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative glass-card rounded-3xl p-8 flex flex-col ${
                plan.popular ? "border-primary/50 shadow-[0_0_30px_rgba(34,197,94,0.15)]" : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/20 p-0.5 rounded-full">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-300 text-sm leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.href} className="w-full mt-auto">
                <Button 
                  className={`w-full h-12 ${
                    plan.popular 
                      ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/5"
                  }`}
                >
                  Buy Now
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <Check className="w-4 h-4 text-primary" />
          Payments securely processed by Razorpay
        </div>
      </div>
    </section>
  );
}
