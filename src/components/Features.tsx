"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Crosshair, LayoutDashboard, BrainCircuit, Bell, BarChart3, Activity } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Money Concepts",
    description: "Automatically detects Order Blocks, Fair Value Gaps, and Liquidity Sweeps to align you with institutional flow."
  },
  {
    icon: Activity,
    title: "Candlestick Pattern Engine",
    description: "Identifies high-probability patterns like Engulfing, Hammer, Morning Star, and more at key levels."
  },
  {
    icon: BarChart3,
    title: "Multi-Timeframe Trend Filter",
    description: "Filters out noise by confirming the trend across multiple timeframes before generating a signal."
  },
  {
    icon: Crosshair,
    title: "Automatic Entry/SL/Targets",
    description: "Every signal includes precise Entry, Stop Loss, and up to 3 Take Profit targets displayed directly on the chart."
  },
  {
    icon: Bell,
    title: "TradingView Alerts",
    description: "Never miss a trade. Connect signals to your phone, email, or trading bot via TradingView webhooks."
  },
  {
    icon: LayoutDashboard,
    title: "Market Dashboard",
    description: "On-chart HUD showing market bias, confidence score (0-100%), and signal quality in real-time."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Institutional Grade <span className="text-gradient-primary">Features</span></h2>
          <p className="text-gray-400 text-lg">
            Our indicator replaces 10+ different scripts by combining everything you need into one clean, powerful interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <Card className="glass-card h-full border-white/5 bg-black/40 hover:bg-white/5 transition-all duration-300 border-0 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <feature.icon className="w-32 h-32 text-primary" />
                </div>
                <CardContent className="p-8 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 shadow-inner border border-primary/30">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
