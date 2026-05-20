"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "Is the code visible?",
      a: "No, this is a premium closed-source indicator. You will receive invite-only access to use the script on your TradingView charts, but the proprietary source code remains hidden to protect our algorithms."
    },
    {
      q: "Which markets are supported?",
      a: "The indicator works on all markets supported by TradingView, including Indian Indices (NIFTY, BANKNIFTY), Stocks, Forex, Crypto, and Commodities. It adapts to the volatility of the specific asset."
    },
    {
      q: "Which timeframes work best?",
      a: "The indicator is highly versatile. For intraday trading, we recommend the 3m, 5m, and 15m timeframes. For swing trading, the 1H, 4H, and Daily timeframes provide excellent results."
    },
    {
      q: "How do I receive access after payment?",
      a: "Upon successful payment, our automated system instantly processes your TradingView username. You will receive an email confirmation and the indicator will appear in your 'Invite-Only Scripts' section on TradingView within minutes."
    },
    {
      q: "Do you offer refunds?",
      a: "Due to the digital nature of the product, we do not offer refunds. We highly recommend trying out our 7-Day Trial plan first to ensure the indicator suits your trading style before committing to a longer plan."
    },
    {
      q: "Is this suitable for beginners?",
      a: "Absolutely. The indicator does the heavy lifting of market analysis and provides clear, actionable signals with exact entry, stop loss, and target levels. However, basic knowledge of trading and risk management is highly recommended."
    }
  ];

  return (
    <section id="faq" className="py-24 relative bg-black border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Frequently Asked <span className="text-gradient-primary">Questions</span></h2>
          <p className="text-gray-400 text-lg">Got questions? We've got answers.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 md:p-8"
        >
          <Accordion className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10">
                <AccordionTrigger className="text-left text-white hover:text-primary hover:no-underline font-medium text-lg py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
