import { ProfileForm } from "@/features/profiles/components/profile-form";
import { getMyProfile } from "@/features/profiles/actions/profile-actions";

export const metadata = {
  title: "Complete Your Profile | Eternity",
  description: "Set up your matrimonial profile to find your perfect match.",
};

export default async function ProfileSetupPage() {
  // Fetch existing profile (will be null for new users)
  const profile = await getMyProfile();

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4">
          {profile?.first_name ? "Edit your profile" : "Let\u0027s build your profile"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {profile?.first_name
            ? "Update your details to keep your profile fresh and accurate."
            : "Take your time to fill this out. Authentic, detailed profiles get 400% more matches."}
        </p>
      </div>
      
      <ProfileForm initialData={profile} />
    </div>
  );
}
