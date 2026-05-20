"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rahul S.",
      role: "BankNifty Options Trader",
      text: "I was struggling with overtrading and emotional entries. The auto targets and stop loss features completely changed my psychology. Up 15% this month.",
      rating: 5,
      avatar: "R"
    },
    {
      name: "Amit P.",
      role: "Swing Trader",
      text: "The multi-timeframe trend filter is a game changer. It keeps me out of choppy markets and only gives signals when the higher timeframe aligns.",
      rating: 5,
      avatar: "A"
    },
    {
      name: "Sneha M.",
      role: "Forex & Crypto",
      text: "Cleanest indicator I've ever used. Replaced my messy charts with one sleek overlay. The order block detection is scarily accurate.",
      rating: 5,
      avatar: "S"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by <span className="text-gradient-primary">Traders</span></h2>
          <p className="text-gray-400 text-lg">
            Don't just take our word for it. Here is what our community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="glass-card border-white/10 h-full">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-8 italic">"{t.text}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-white font-bold">{t.name}</div>
                      <div className="text-gray-500 text-sm">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
