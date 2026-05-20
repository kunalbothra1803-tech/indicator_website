import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto glass-card p-10 text-center border-t-4 border-t-primary">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Payment Successful!</h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Welcome to the elite club of institutional traders. We've received your payment and are setting up your access.
          </p>
          
          <div className="bg-white/5 rounded-xl p-6 text-left border border-white/10 mb-10">
            <h3 className="text-lg font-bold text-white mb-4">Next Steps:</h3>
            <ol className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <span className="font-bold text-primary">1.</span> 
                <span>Check your inbox for a confirmation email containing important instructions.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">2.</span> 
                <span>Our team is verifying your TradingView username.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary">3.</span> 
                <span>You will find "IPE PRO" under the <strong>Invite-Only Scripts</strong> section in TradingView within a few hours.</span>
              </li>
            </ol>
          </div>
          
          <Link href="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 shadow-[0_0_20px_rgba(34,197,94,0.3)] w-full sm:w-auto">
              Return to Homepage
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
