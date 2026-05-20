"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function LeadCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds of scroll or time
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("leadCaptureSeen");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("leadCaptureSeen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, send to API endpoint (Resend/Brevo)
      console.log("Email captured:", email);
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md bg-black/90 backdrop-blur-xl border border-white/10 text-white p-0 overflow-hidden rounded-2xl gap-0 shadow-2xl">
        <VisuallyHidden.Root>
          <DialogTitle>Get Free PDF</DialogTitle>
          <DialogDescription>Enter your email to receive 5 High-Probability Candlestick Setups.</DialogDescription>
        </VisuallyHidden.Root>
        <div className="relative">
          {/* Close button inside DialogContent context if needed, but Dialog handles it */}
          <div className="p-8">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Free Trader's Cheat Sheet</h3>
              <p className="text-gray-400 text-sm">
                Get our exclusive PDF: <span className="text-white font-medium">"5 High-Probability Candlestick Setups"</span> delivered instantly to your inbox.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <Input
                    type="email"
                    placeholder="Enter your best email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white h-12 focus-visible:ring-primary"
                  />
                  <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold">
                    Send Me The Free PDF <Send className="w-4 h-4 ml-2" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 text-green-400 p-4 rounded-lg text-center font-medium border border-green-500/30"
                >
                  Success! Check your inbox for the PDF.
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. No spam ever.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
