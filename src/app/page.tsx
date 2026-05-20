import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Performance } from "@/components/Performance";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { LeadCapture } from "@/components/LeadCapture";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Performance />
      <Pricing />
      <Testimonials />
      <FAQ />
      <LeadCapture />
    </>
  );
}
