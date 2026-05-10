import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden text-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-unsplash.jpg"
          alt="Elegant Indian Wedding"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        {/* Centered elegant overlay fading into background color */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <span className="inline-block py-1.5 px-4 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-foreground font-medium text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          India&apos;s Most Exclusive Matrimonial Network
        </span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-semibold text-foreground leading-[1.1] mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          Where Forever <br className="hidden md:block"/> Begins.
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Curated matches for modern professionals who value intellect, privacy, and meaningful connections. Discover a partnership of equals.
        </p>

        <div className="flex w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Link
            href="/signup"
            className={buttonVariants({ 
              size: "lg", 
              className: "h-14 px-10 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-primary/25 transition-all w-full sm:w-auto" 
            })}
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
