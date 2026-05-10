import { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake, Shield, Heart, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication | Eternity Matrimony",
  description: "Login or Sign Up for your account.",
};

const FEATURES = [
  { icon: Shield, text: "100% verified profiles" },
  { icon: Heart, text: "AI-powered compatibility matching" },
  { icon: CheckCircle2, text: "Industry-leading privacy controls" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Branding Panel */}
      <div className="hidden md:flex md:w-[45%] lg:w-[42%] bg-gradient-to-br from-primary/8 via-primary/3 to-background flex-col justify-between p-10 lg:p-14 border-r border-border/50 relative overflow-hidden">
        {/* Decorative blobs – hidden from AT */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-primary/8 rounded-full blur-3xl" aria-hidden="true" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 text-primary font-heading text-2xl font-semibold mb-2 group" aria-label="Eternity Matrimony home">
            <HeartHandshake className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            <span>Eternity</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-heading font-semibold mb-5 text-foreground leading-[1.15] tracking-tight">
            Find your perfect match today.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Join thousands who&apos;ve found their life partners through our secure and premium matchmaking service.
          </p>
          <ul className="space-y-4" role="list" aria-label="Platform features">
            {FEATURES.map(({ icon: Icon, text }, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Static year – avoids hydration mismatch from new Date() in render */}
        <p className="text-xs text-muted-foreground relative z-10">
          © 2025 Eternity Matrimony. All rights reserved.
        </p>
      </div>

      {/* Right Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="md:hidden flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2.5 text-primary font-heading text-2xl font-semibold group" aria-label="Eternity Matrimony home">
              <HeartHandshake className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <span>Eternity</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
