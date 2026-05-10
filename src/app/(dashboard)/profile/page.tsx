import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Briefcase, GraduationCap, IndianRupee, Heart, Calendar, Edit, User2,
  Ruler, Languages, Sparkles,
} from "lucide-react";

import { getMyProfile } from "@/features/profiles/actions/profile-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Profile | Eternity",
  description: "View your matrimonial profile.",
};

export default async function MyProfilePage() {
  const profile = await getMyProfile();

  // If the user hasn't created a profile yet, send them to setup
  if (!profile || !profile.first_name) {
    redirect("/profile/setup");
  }

  // Calculate age from date_of_birth
  let age: number | null = null;
  if (profile.date_of_birth) {
    const dob = new Date(profile.date_of_birth);
    // eslint-disable-next-line react-hooks/purity
    const diff = Date.now() - dob.getTime();
    age = Math.abs(new Date(diff).getUTCFullYear() - 1970);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4">
      {/* ───── Header Card ───── */}
      <Card className="overflow-hidden border-border/50 shadow-lg group">
        {/* Removed cover gradient as requested */}

        <CardContent className="relative px-6 md:px-8 py-8">
          {/* Avatar */}
          <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted mb-5 ring-2 ring-primary/10 ring-offset-2 ring-offset-background transition-all duration-300">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url.split(',')[0]}
                alt={`${profile.first_name} ${profile.last_name}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground bg-linear-to-br from-muted to-muted/50">
                <User2 className="h-14 w-14" />
              </div>
            )}
          </div>

          {/* Name + Badges + Edit */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold tracking-tight">
                {profile.first_name} {profile.last_name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-sm mt-1.5">
                {age && <span>{age} yrs</span>}
                {profile.gender && (
                  <>
                    <span className="text-border">·</span>
                    <span>{profile.gender}</span>
                  </>
                )}
                {profile.religion && (
                  <>
                    <span className="text-border">·</span>
                    <span>{profile.religion}</span>
                  </>
                )}
                {profile.marital_status && (
                  <>
                    <span className="text-border">·</span>
                    <span>{profile.marital_status}</span>
                  </>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                {profile.is_premium && (
                  <Badge className="bg-linear-to-r from-amber-500/15 to-amber-400/10 text-amber-600 border-amber-500/20 shadow-none gap-1">
                    <Sparkles className="h-3 w-3" /> Premium
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {profile.role === "admin" ? "Admin" : "Member"}
                </Badge>
              </div>
            </div>

            <Link href="/profile/setup" className="shrink-0">
              <Button variant="outline" size="sm" className="gap-2 shadow-sm hover:shadow-md transition-shadow">
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* ───── Details Grid ───── */}
      <div className="grid sm:grid-cols-2 gap-3">
        {profile.location_city && (
          <InfoCard icon={MapPin} label="Location" value={`${profile.location_city}${profile.location_country ? `, ${profile.location_country}` : ""}`} />
        )}
        {profile.profession && (
          <InfoCard icon={Briefcase} label="Profession" value={profile.profession} />
        )}
        {profile.education && (
          <InfoCard icon={GraduationCap} label="Education" value={profile.education} />
        )}
        {profile.annual_income && (
          <InfoCard icon={IndianRupee} label="Annual Income" value={profile.annual_income} />
        )}
        {profile.marital_status && (
          <InfoCard icon={Heart} label="Marital Status" value={profile.marital_status} />
        )}
        {profile.community && (
          <InfoCard icon={Calendar} label="Community" value={profile.community} />
        )}
        {profile.height && (
          <InfoCard icon={Ruler} label="Height" value={`${profile.height} cm`} />
        )}
        {profile.mother_tongue && (
          <InfoCard icon={Languages} label="Mother Tongue" value={profile.mother_tongue} />
        )}
      </div>

      {/* ───── Bio ───── */}
      {profile.bio && (
        <Card className="border-border/50 hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6 pb-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">About Me</h3>
            <p className="text-foreground/90 leading-relaxed text-[15px]">{profile.bio}</p>
          </CardContent>
        </Card>
      )}

      {/* ───── Interests ───── */}
      {profile.interests && (
        <Card className="border-border/50 hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6 pb-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Interests & Hobbies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.split(",").map((interest: string, idx: number) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="px-3.5 py-1.5 text-xs font-medium rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                >
                  {interest.trim()}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      {/* ───── Additional Photos Gallery ───── */}
      {profile.avatar_url && profile.avatar_url.split(',').length > 1 && (
        <Card className="border-border/50 hover:shadow-md transition-shadow duration-300">
          <CardContent className="pt-6 pb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {profile.avatar_url.split(',').slice(1).map((url: string, idx: number) => (
                <div key={idx} className="relative aspect-3/4 rounded-xl overflow-hidden border shadow-sm">
                  <Image src={url} alt={`Photo ${idx + 2}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ───── Reusable Info Card ───── */
function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all duration-300 group/card">
      <CardContent className="flex items-center gap-4 py-4 px-5">
        <div className="h-10 w-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary shrink-0 transition-colors duration-300 group-hover/card:bg-primary/12">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-sm font-semibold truncate">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
