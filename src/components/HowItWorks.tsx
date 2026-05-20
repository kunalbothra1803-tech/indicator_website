"use client";

import { motion } from "framer-motion";

export function HowItWorks() {
  const steps = [
    { num: "01", title: "Price Reaches Key Levels", desc: "The engine constantly monitors for price approaching major Support, Resistance, or Order Blocks." },
    { num: "02", title: "Institutional Filters Validate", desc: "Volume, RSI, ATR, and Multi-Timeframe trend filters run in the background to validate the setup." },
    { num: "03", title: "Signal Box Appears", desc: "A popup signal box appears on your chart detailing the pattern, confidence score, and specific price levels." },
    { num: "04", title: "Enter Trade with Defined Risk", desc: "Place your order using the exact Entry and Stop Loss levels provided to ensure proper risk management." },
    { num: "05", title: "Manage Using Auto Targets", desc: "Scale out or close your position as price hits Target 1, Target 2, and Target 3." }
  ];

  return (
    <section className="py-24 bg-black relative border-y border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How It <span className="text-gradient-primary">Works</span></h2>
            <p className="text-gray-400 text-lg mb-12">
              A systematic approach to trading. Remove emotions and rely on algorithmic precision.
            </p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="shrink-0 text-3xl font-bold text-primary/40 font-mono">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-transparent blur-3xl -z-20 rounded-full" />
            
            {/* Background Chart Mockup */}
            <div className="absolute -inset-4 md:-inset-8 z-0 opacity-30 rounded-2xl overflow-hidden border border-white/10 hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?q=80&w=2000&auto=format&fit=crop" 
                alt="Market Chart" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Sample Signal Box Visualization */}
            <div className="glass-card p-6 md:p-8 relative overflow-hidden border-l-4 border-l-primary shadow-2xl z-10 backdrop-blur-2xl bg-black/80">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <div className="text-8xl font-black text-primary">BUY</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></span>
                BUY Signal Detected
              </h3>
              
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Pattern:</span>
                  <span className="text-white">Bullish Engulfing at Support</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Confidence:</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Entry:</span>
                  <span className="text-white font-bold">24,560</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Stop Loss:</span>
                  <span className="text-red-400 font-bold">24,420</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Target 1:</span>
                  <span className="text-primary font-bold">24,700</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2 hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Target 2:</span>
                  <span className="text-primary font-bold">24,840</span>
                </div>
                <div className="flex justify-between hover:bg-white/5 px-2 -mx-2 rounded transition-colors">
                  <span className="text-gray-400">Target 3:</span>
                  <span className="text-primary font-bold">25,000</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-500 text-right">
                Time: 10:15 AM
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
