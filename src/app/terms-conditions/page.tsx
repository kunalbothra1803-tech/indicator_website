import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | IPE PRO",
};

export default function TermsConditions() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
        <p>
          Welcome to Institutional Precision Engine PRO. By accessing our website and purchasing our TradingView indicator, you agree to be bound by these Terms and Conditions.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">1. License and Usage</h3>
        <p>
          Upon purchase, you are granted a non-exclusive, non-transferable license to use the IPE PRO indicator on a single TradingView account. You may not share, resell, or distribute access to the indicator.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">2. Intellectual Property</h3>
        <p>
          The proprietary algorithms, source code, and logic behind the indicator remain the sole property of IPE PRO. Any attempt to decompile, reverse engineer, or copy the indicator's logic is strictly prohibited and will result in immediate termination of access without refund.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">3. Limitation of Liability</h3>
        <p>
          We are not liable for any financial losses or damages incurred while using our indicator. Trading is risky, and our software is a tool to assist in analysis, not a definitive trading system.
        </p>
      </div>
    </div>
  );
}
