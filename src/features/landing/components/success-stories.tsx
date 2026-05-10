import { Quote } from "lucide-react";

export function SuccessStories() {
  return (
    <section className="py-24 bg-muted/30 text-foreground relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-6 leading-tight text-foreground">
              A match made in heaven, discovered on Eternity.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg font-light">
              Every day, thousands of couples find their forever on our platform. Your story could be the next one we share with the world.
            </p>
            <div className="flex gap-8 md:gap-12">
              <div className="flex flex-col">
                <span className="text-4xl font-heading font-medium text-foreground">2M+</span>
                <span className="text-sm text-muted-foreground tracking-wider mt-2 font-medium">Success Stories</span>
              </div>
              <div className="w-px bg-border mx-2" />
              <div className="flex flex-col">
                <span className="text-4xl font-heading font-medium text-foreground">50+</span>
                <span className="text-sm text-muted-foreground tracking-wider mt-2 font-medium">Countries</span>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="bg-card text-card-foreground p-8 md:p-12 rounded-[2rem] shadow-xl border border-border/50 relative z-10 transition-transform duration-500 hover:-translate-y-2">
              <Quote className="h-10 w-10 text-primary/40 mb-8" />
              <p className="text-xl md:text-2xl font-serif italic mb-10 leading-relaxed text-foreground/90">
                &quot;We were both skeptical about finding love online, but the verified profiles and deep compatibility matching on Eternity changed everything. We met in December, and were married by June. It truly feels like magic.&quot;
              </p>
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 bg-secondary/30 rounded-full overflow-hidden relative shadow-sm">
                  {/* Avatar placeholder, normally an image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading font-medium text-primary">S&A</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg">Sarah & Amit</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">Happily married since 2024</p>
                </div>
              </div>
            </div>
            
            {/* Offset decorative card */}
            <div className="absolute top-8 -right-8 w-full h-full bg-secondary/10 border border-secondary/20 rounded-[2rem] z-0 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
