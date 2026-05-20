"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, ShieldCheck, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
            >
              <Lock className="w-4 h-4" />
              <span>Invite-Only TradingView Script</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Trade Like Institutions with <span className="text-gradient-primary">High-Probability</span> Signals
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl"
            >
              Get real-time Buy and Sell setups with precise Entry, Stop Loss, and Profit Targets directly on your TradingView charts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link href="#pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  Get Instant Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#demo" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-white/20 hover:bg-white/10 text-white">
                  Watch Live Demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-4 w-full pt-8"
            >
              {[
                { icon: ShieldCheck, text: "Secure Payments" },
                { icon: Zap, text: "Beginner Friendly" },
                { icon: RefreshCw, text: "Lifetime Updates" },
                { icon: Lock, text: "Invite-Only Access" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-400">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                    <badge.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10 rounded-full" />
            <div className="glass-card p-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 flex items-center gap-2 z-10 shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-white">LIVE SIGNAL</span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop" 
                alt="TradingView Chart Mockup" 
                className="w-full h-auto rounded-xl object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
