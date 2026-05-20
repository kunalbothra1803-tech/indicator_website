import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | IPE PRO",
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
        <p>
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our website and services.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Information We Collect</h3>
        <p>
          When you make a purchase, we collect your name, email address, phone number, and TradingView username. This information is necessary to process your payment and grant you access to the indicator.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Payment Processing</h3>
        <p>
          All payments are processed securely through Razorpay. We do not store or have access to your full credit card numbers or bank account details.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">How We Use Your Data</h3>
        <p>
          We use your email address to send order confirmations, important updates regarding the indicator, and occasional marketing communications (which you can opt out of at any time). Your TradingView username is used strictly to grant script access.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
        </p>
      </div>
    </div>
  );
}
