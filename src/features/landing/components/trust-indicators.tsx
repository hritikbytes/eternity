import { ShieldCheck, UserCheck, Heart, Sparkles } from "lucide-react";

export function TrustIndicators() {
  const indicators = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary/80" />,
      title: "100% Privacy",
      description: "You control who sees your photos",
    },
    {
      icon: <UserCheck className="h-5 w-5 text-primary/80" />,
      title: "Verified Members",
      description: "Strict manual screening process",
    },
    {
      icon: <Heart className="h-5 w-5 text-primary/80" />,
      title: "Intentful Dating",
      description: "For genuine, serious commitments",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-primary/80" />,
      title: "Curated Matches",
      description: "Quality over quantity",
    },
  ];

  return (
    <section id="membership" className="py-16 md:py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-foreground mb-3">
            A safe space for a beautiful beginning.
          </h2>
          <p className="text-base text-muted-foreground font-light">
            We focus on providing a secure, premium environment so you can focus on finding the right one.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {indicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 group">
              <div className="h-12 w-12 bg-muted/50 group-hover:bg-primary/5 rounded-2xl flex items-center justify-center mb-4 transition-colors">
                {indicator.icon}
              </div>
              <h3 className="text-[15px] font-heading font-medium text-foreground mb-1.5">{indicator.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-50">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
