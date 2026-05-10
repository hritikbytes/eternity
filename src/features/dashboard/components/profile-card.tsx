import Image from "next/image";
import { CheckCircle2, Crown, MapPin, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { MatchProfile } from "../types/dashboard.types";
import { InterestButton } from "@/features/interests/components/interest-button";

interface ProfileCardProps {
  profile: MatchProfile;
  onSkip?: (id: string) => void;
}

export function ProfileCard({ profile, onSkip }: ProfileCardProps) {
  return (
    <Card className="group relative overflow-hidden rounded-[2rem] border border-border/40 bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          {profile.isPremium && (
            <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground backdrop-blur-md border border-white/20 shadow-sm gap-1.5 px-3 py-1 rounded-full font-medium">
              <Crown className="h-3.5 w-3.5" /> Premium
            </Badge>
          )}
          <Badge className="bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm px-3 py-1 rounded-full font-medium">
            {profile.matchPercentage}% Match
          </Badge>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-3xl font-heading font-semibold shadow-sm">
              {profile.name}, {profile.age}
            </h3>
            {profile.isVerified && (
              <Tooltip>
                <TooltipTrigger>
                  <CheckCircle2 className="h-6 w-6 text-blue-400 fill-blue-400/20 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Profile</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <div className="space-y-1.5 text-white/90 text-sm font-medium">
            <p className="flex items-center gap-2">
              <span className="opacity-75">💼</span> {profile.profession}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 opacity-75" /> {profile.location}
            </p>
            <p className="flex items-center gap-2">
              <span className="opacity-75">🎓</span> {profile.education}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Action Bar */}
      <div className="grid grid-cols-3 gap-0 border-t border-border/30 bg-card/50 backdrop-blur-sm relative z-10">
        <Button 
          variant="ghost" 
          className="h-16 rounded-none hover:bg-muted/50 hover:text-foreground text-muted-foreground transition-all duration-300 group/btn"
          onClick={() => onSkip?.(profile.id)}
        >
          <X className="h-6 w-6 transition-transform group-hover/btn:scale-110" />
        </Button>
        <div className="col-span-2 flex">
          <InterestButton 
            profileId={profile.id} 
            className="w-full h-16 rounded-none border-l border-border/50 text-base font-semibold" 
          />
        </div>
      </div>
    </Card>
  );
}
