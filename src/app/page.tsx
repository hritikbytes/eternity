import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/landing/components/hero-section";
import { TrustIndicators } from "@/features/landing/components/trust-indicators";


export const metadata: Metadata = {
  title: "Eternity Matrimony - Find Your Perfect Life Partner",
  description: "Join India's most trusted and elegant matrimonial platform. Connect with verified professionals. AI-powered matching, 100% privacy guaranteed.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Find Your Perfect Life Partner – Eternity Matrimony",
    description:
      "Join India's most trusted matrimonial platform. Verified profiles, AI-powered matching, 100% privacy.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Navbar />

      <div className="flex-1">

        <HeroSection />

        <TrustIndicators />
      </div>

      <Footer />
    </main>
  );
}
