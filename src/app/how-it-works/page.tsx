import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, Heart, Shield, Sparkles } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">How Eternity Works</h1>
          <p className="text-xl text-muted-foreground">
            We&apos;ve reimagined matchmaking for the modern professional. Here is how your journey to finding the perfect life partner unfolds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Create Your Profile</h3>
            <p className="text-muted-foreground">
              Sign up and complete our comprehensive personality and preference questionnaire. We use this data to understand what truly matters to you.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI-Powered Matching</h3>
            <p className="text-muted-foreground">
              Our proprietary matching algorithm analyzes compatibility across values, lifestyle, and goals to suggest highly compatible matches.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Connect Safely</h3>
            <p className="text-muted-foreground">
              Take the next step with secure in-app messaging. All our profiles are fully verified to ensure a trustworthy experience.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-card border border-border p-8 md:p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">How Are We Different?</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">100% Profile Verification</h4>
                <p className="text-muted-foreground">Unlike traditional platforms filled with fake profiles, every user on Eternity undergoes government ID and professional verification before gaining access to matches.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Sparkles className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Quality Over Quantity</h4>
                <p className="text-muted-foreground">We don&apos;t overwhelm you with thousands of random profiles. We send you curated, highly-filtered matches who genuinely align with your core values and lifestyle.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Heart className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Privacy First Approach</h4>
                <p className="text-muted-foreground">Your photo and detailed profile are only visible to matches you approve. You have complete control over who sees your information.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
              <div>
                <h4 className="text-xl font-semibold mb-2">Focus on Modern Compatability</h4>
                <p className="text-muted-foreground">We look beyond traditional metrics. Our algorithm factors in educational backgrounds, career ambitions, financial habits, and modern relationship expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}