import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | IPE PRO",
};

export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
        <p>
          Due to the digital nature of the Institutional Precision Engine PRO (IPE PRO) indicator and the immediate access granted upon purchase, all sales are final.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">No Refunds</h3>
        <p>
          We do not offer refunds, exchanges, or cancellations once access to the TradingView script has been provisioned. By completing your purchase, you acknowledge and agree to this no-refund policy.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">7-Day Trial</h3>
        <p>
          We strongly encourage all prospective users to purchase the 7-Day Trial plan before committing to a monthly, quarterly, or lifetime subscription. This allows you to test the indicator in real-time market conditions and ensure it fits your trading style.
        </p>
        <h3 className="text-xl font-semibold text-white mt-8 mb-4">Subscription Cancellations</h3>
        <p>
          For recurring subscriptions (Monthly and Quarterly), you may cancel your subscription at any time to prevent future billing. Cancellation will not result in a refund for the current billing cycle, but you will retain access until the end of your paid period.
        </p>
      </div>
    </div>
  );
}
