"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, BarChart2, Activity } from "lucide-react";

export function Performance() {
  const metrics = [
    { label: "Win Rate", value: "78%", icon: Target, color: "text-green-400" },
    { label: "Profit Factor", value: "2.4", icon: TrendingUp, color: "text-green-400" },
    { label: "Avg. R:R", value: "1:2.5", icon: BarChart2, color: "text-white" },
    { label: "Trades / Day", value: "3-5", icon: Activity, color: "text-white" },
  ];

  return (
    <section id="performance" className="py-24 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Proven <span className="text-gradient-primary">Performance</span></h2>
          <p className="text-gray-400 text-lg">
            Tested across multiple assets including NIFTY, BANKNIFTY, Forex, and Crypto. 
            Designed for both Intraday and Swing traders.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="glass-card bg-black/60 border-white/10 text-center py-8">
                <CardContent className="p-0 flex flex-col items-center">
                  <metric.icon className="w-8 h-8 text-gray-400 mb-4" />
                  <div className={`text-4xl md:text-5xl font-bold mb-2 ${metric.color}`}>
                    {metric.value}
                  </div>
                  <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                    {metric.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for chart/screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden border border-white/10 relative aspect-[16/9] md:aspect-[21/9] bg-white/5 flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="relative z-10 text-center">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Real Charts. Real Results.</h3>
            <p className="text-gray-300">Live example of an institutional order block bounce.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
