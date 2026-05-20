"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Video, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WebinarPage() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    webinarDate: "",
  });

  const getUpcomingDates = () => {
    // Generate dates for the next Saturday and Sunday at 5 PM
    const dates = [];
    const now = new Date();
    
    // Find next Saturday
    const sat = new Date();
    sat.setDate(now.getDate() + (6 - now.getDay() + 7) % 7);
    sat.setHours(17, 0, 0, 0); // 5 PM
    if (sat > now) dates.push(sat);
    
    // Find next Sunday
    const sun = new Date();
    sun.setDate(now.getDate() + (7 - now.getDay() + 7) % 7);
    sun.setHours(17, 0, 0, 0); // 5 PM
    if (sun > now) dates.push(sun);

    // Provide some immediate options if it's currently a weekend
    if (dates.length < 2) {
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(17, 0, 0, 0);
      dates.push(tomorrow);
    }
    
    return dates;
  };

  const upcomingDates = getUpcomingDates();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.webinarDate) {
      alert("Please select a webinar date.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/webinar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setRegistered(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to register. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emerald-900/10 -z-10" />
        <div className="glass-card p-10 max-w-lg text-center mx-4 border-t-4 border-t-primary">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">You're Registered!</h2>
          <p className="text-gray-300 mb-6">
            We've just sent a confirmation message to your WhatsApp number ({formData.whatsapp}).
          </p>
          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/10 mb-6">
            <p className="text-sm text-gray-400 mb-2"><strong>Next Steps:</strong></p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>1. Save our WhatsApp number so you receive the link.</li>
              <li>2. Add the event to your calendar.</li>
              <li>3. Show up 5 minutes early!</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Copy & Value Proposition */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-sm font-bold mb-6">
                <Video className="w-4 h-4" />
                <span>FREE LIVE TRAINING</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                How to Trade Like an <span className="text-gradient-primary">Institution</span> and Eliminate Guesswork
              </h1>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Join our exclusive 60-minute masterclass and discover the exact framework we use to identify high-probability setups before the retail crowd catches on.
              </p>

              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2">What You Will Learn:</h3>
              <ul className="space-y-4 mb-10">
                {[
                  "The 3 Smart Money Concepts that instantly reveal market direction.",
                  "How to automate pattern detection so you never miss an entry.",
                  "The exact Risk-to-Reward system used by prop firm traders.",
                  "Live walkthrough of the Institutional Precision Engine PRO."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded-full h-fit">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary"/> 60 Minutes</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary"/> Hosted Live</div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Registration Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-8 md:p-10 border-t-4 border-t-primary shadow-2xl relative overflow-hidden">
              {/* Form subtle bg glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100px] bg-primary/10 blur-[50px] -z-10" />
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Secure Your Spot</h2>
              <p className="text-gray-400 text-center mb-8 text-sm">Seats are strictly limited to ensure quality Q&A.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">First Name</Label>
                  <Input 
                    id="name" 
                    required 
                    placeholder="Enter your name"
                    className="bg-black/50 border-white/10 text-white h-12" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    placeholder="Where should we send the workbook?"
                    className="bg-black/50 border-white/10 text-white h-12" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp Number</Label>
                  <Input 
                    id="whatsapp" 
                    type="tel" 
                    required 
                    placeholder="+91 9876543210"
                    className="bg-black/50 border-white/10 text-white h-12" 
                    value={formData.whatsapp} 
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} 
                  />
                  <p className="text-xs text-gray-500">We will send the Zoom link directly to your WhatsApp.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webinarDate" className="text-gray-300">Select Session</Label>
                  <select 
                    id="webinarDate"
                    required
                    value={formData.webinarDate}
                    onChange={(e) => setFormData({...formData, webinarDate: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 text-white rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="" disabled>Choose a time...</option>
                    {upcomingDates.map((date, idx) => (
                      <option key={idx} value={date.toISOString()}>
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </option>
                    ))}
                  </select>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full h-14 mt-4 bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white text-lg font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
                >
                  {loading ? "Registering..." : "REGISTER FOR FREE"}
                  {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
                
                <p className="text-center text-xs text-gray-600 mt-4">
                  By registering, you agree to receive WhatsApp reminders about this event.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
