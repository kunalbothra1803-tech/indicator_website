import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclaimer | IPE PRO",
};

export default function RiskDisclaimer() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-32 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Risk Disclaimer</h1>
      <div className="prose prose-invert max-w-none text-gray-400 space-y-6">
        <p>
          Trading in financial markets, including but not limited to stocks, forex, crypto, and derivatives, involves a high degree of risk and may not be suitable for all investors. You could lose some or all of your initial investment.
        </p>
        <p>
          The Institutional Precision Engine PRO (IPE PRO) indicator is for educational and informational purposes only. It does not constitute financial advice, investment recommendations, or a guarantee of future performance.
        </p>
        <p>
          Past performance of any trading system or methodology is not necessarily indicative of future results. You should carefully consider your investment objectives, level of experience, and risk appetite before deciding to trade in any market.
        </p>
        <p>
          We assume no responsibility for any trading losses you may incur as a result of using this indicator. Always conduct your own research and consult with a certified financial advisor if you have any doubts.
        </p>
      </div>
    </div>
  );
}
