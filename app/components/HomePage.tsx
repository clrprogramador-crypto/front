"use client";

import { useState } from "react";
import Header from "./Header";
import HeroSlider from "./HeroSlider";
import InfoSection from "./InfoSection";
import BenefitsSection from "./BenefitsSection";
import HowItWorksSection from "./HowItWorksSection";
import SituationsSection from "./SituationsSection";
import TherapistsSection from "./TherapistsSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export type Audience = "paciente" | "terapeuta";

export default function HomePage() {
  const [audience, setAudience] = useState<Audience>("paciente");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(236,245,236,0.8),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(224,234,255,0.85),_transparent_36%),#fbfbfb] text-slate-900">
      <Header audience={audience} setAudience={setAudience} />

      <main className="overflow-hidden">
        <HeroSlider audience={audience} />
        <div className="space-y-24">
          <InfoSection audience={audience} />
          <BenefitsSection audience={audience} />
          <HowItWorksSection audience={audience} />
          <SituationsSection audience={audience} />
          <TherapistsSection audience={audience} />
          <TestimonialsSection audience={audience} />
          <FAQSection audience={audience} />
          <ContactSection audience={audience} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
