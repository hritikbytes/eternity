import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ProfileShowcase() {
  const profiles = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 28,
      profession: "Software Engineer",
      location: "San Francisco, CA",
      image: "/images/profile-1.png",
      match: "98%",
    },
    {
      id: 2,
      name: "Arjun Patel",
      age: 30,
      profession: "Investment Banker",
      location: "New York, NY",
      image: "/images/profile-2.png",
      match: "95%",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4 text-foreground">
            Meet Verified Professionals
          </h2>
          <p className="text-lg text-muted-foreground">
            Our strict verification process ensures you only connect with genuine, high-intent individuals looking for a serious commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 group bg-card">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">Verified</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  {profile.match} Match
                </div>
                {/* Gradient fade for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-heading font-semibold text-white flex items-center gap-2">
                    {profile.name}, {profile.age}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">{profile.profession}</p>
                  <p className="text-white/60 text-sm">{profile.location}</p>
                </div>
              </div>
            </Card>
          ))}
          
          {/* CTA Card */}
          <Card className="overflow-hidden border-border/50 bg-primary/5 flex flex-col items-center justify-center text-center p-8 hidden lg:flex">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl font-heading font-bold text-primary">+10k</span>
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-2">More Profiles</h3>
            <p className="text-muted-foreground mb-6">
              Join today to unlock thousands of verified premium profiles matching your criteria.
            </p>
            <a href="/signup" className="font-semibold text-primary hover:underline">
              Create your account →
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}
