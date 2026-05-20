import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image 
                src="/logo.png" 
                alt="IPE PRO Logo" 
                width={56} 
                height={56} 
                className="rounded-lg object-contain"
              />
              <span className="font-bold text-2xl text-white">IPE PRO</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md mb-6 leading-relaxed">
              Trade like institutions with high-probability buy and sell signals. Our proprietary algorithms filter out noise and deliver precise entries, stop losses, and targets.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <a href="mailto:kunalbothra318@gmail.com">kunalbothra318@gmail.com</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Features", "Performance", "Pricing", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Risk Disclaimer", "Terms & Conditions", "Refund Policy", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left max-w-3xl">
            <strong className="text-gray-400">RISK DISCLAIMER:</strong> This indicator is for educational purposes only and does not guarantee profits. Trading involves substantial risk of loss and is not suitable for every investor. The valuation of financial instruments may fluctuate, and you may lose more than your original investment.
          </p>
          <p className="text-gray-500 text-sm shrink-0">
            &copy; {new Date().getFullYear()} IPE PRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
