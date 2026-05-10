"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Camera, ChevronLeft, ChevronRight, CheckCircle2, X } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

import { profileSchema, type ProfileFormValues } from "../types/profile.types";
import { upsertProfile } from "../actions/profile-actions";

const STEPS = ["Personal", "Professional", "Lifestyle"];

// Props: allow passing existing profile data for editing
interface ProfileFormProps {
  initialData?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    gender: string | null;
    date_of_birth: string | null;
    bio: string | null;
    religion: string | null;
    marital_status: string | null;
    mother_tongue: string | null;
    community: string | null;
    height: number | null;
    location_city: string | null;
    location_country: string | null;
    education: string | null;
    profession: string | null;
    annual_income: string | null;
    interests: string | null;
  } | null;
}

function calculateAgeFromDob(dob: string | null): number | undefined {
  if (!dob) return undefined;
  const birthDate = new Date(dob);
  const diff = Date.now() - birthDate.getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialPhotos = initialData?.avatar_url ? initialData.avatar_url.split(',') : [];
  const [photos, setPhotos] = useState<string[]>(initialPhotos);

  const isEditing = !!initialData?.first_name;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as unknown as Resolver<ProfileFormValues>,
    defaultValues: {
      fullName: initialData ? `${initialData.first_name || ""} ${initialData.last_name || ""}`.trim() : "",
      age: calculateAgeFromDob(initialData?.date_of_birth ?? null) ?? (undefined as unknown as number),
      gender: (initialData?.gender as "Male" | "Female" | "Other") || "Male",
      religion: initialData?.religion || "",
      maritalStatus: initialData?.marital_status || "",
      motherTongue: initialData?.mother_tongue || "",
      community: initialData?.community || "",
      height: initialData?.height || (undefined as unknown as number),
      profession: initialData?.profession || "",
      education: initialData?.education || "",
      income: initialData?.annual_income || "",
      city: initialData?.location_city || "",
      state: initialData?.location_country || "",
      bio: initialData?.bio || "",
      interests: initialData?.interests || "",
      avatarUrl: initialData?.avatar_url || undefined,
      isPublic: true,
    },
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors, isValid }, trigger, setValue, watch } = form;

  const processNext = async () => {
    let fieldsToValidate: (keyof ProfileFormValues)[] = [];
    
    if (currentStep === 0) {
      fieldsToValidate = ["fullName", "age", "gender", "religion", "maritalStatus", "motherTongue"];
    } else if (currentStep === 1) {
      fieldsToValidate = ["profession", "education", "income"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const processPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await upsertProfile({
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
        religion: data.religion,
        maritalStatus: data.maritalStatus,
        motherTongue: data.motherTongue,
        community: data.community,
        height: data.height,
        profession: data.profession,
        education: data.education,
        income: data.income,
        city: data.city,
        state: data.state,
        bio: data.bio,
        interests: data.interests || "",
        avatarUrl: photos.length > 0 ? photos.join(',') : data.avatarUrl,
        isPublic: data.isPublic,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(isEditing ? "Profile updated successfully!" : "Profile created successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <Card className="max-w-3xl mx-auto border-border/50 shadow-xl">
      <CardHeader className="bg-muted/30 pb-8 border-b border-border/50">
        <div className="flex justify-between items-center mb-6">
          <CardTitle className="text-2xl font-heading font-bold">
            {isEditing ? "Edit Your Profile" : "Complete Your Profile"}
          </CardTitle>
          <span className="text-sm font-medium text-muted-foreground">Step {currentStep + 1} of {STEPS.length}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="flex justify-between mt-3 px-1 text-xs text-muted-foreground font-medium">
          {STEPS.map((step, idx) => (
            <span key={step} className={idx <= currentStep ? "text-primary" : ""}>{step}</span>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-8 px-6 md:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* STEP 1: PERSONAL */}
          <div className={currentStep === 0 ? "block" : "hidden"}>
            <div className="mb-10">
              <Label className="block text-center mb-4">Profile Photos (Up to 3)</Label>
              <div className="flex flex-wrap justify-center gap-6">
                {[0, 1, 2].map((idx) => {
                  const isPrimary = idx === 0;
                  const currentPhoto = photos[idx];

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      {uploadPreset ? (
                        <CldUploadWidget 
                          uploadPreset={uploadPreset}
                          onSuccess={(result: unknown) => {
                            const info = (result as { info: { secure_url: string } }).info;
                            setPhotos(prev => {
                              const newPhotos = [...prev];
                              newPhotos[idx] = info.secure_url;
                              // Filter out undefined/holes if user uploads out of order, but keep index mapped if possible
                              return newPhotos.filter(Boolean);
                            });
                            setValue("avatarUrl", info.secure_url); // just to trigger dirty state
                          }}
                        >
                          {({ open }) => (
                            <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-muted cursor-pointer group border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all">
                              {currentPhoto ? (
                                <>
                                  <Image src={currentPhoto} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="h-6 w-6 text-white" />
                                  </div>
                                </>
                              ) : (
                                <div 
                                  onClick={() => open()}
                                  className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground group-hover:text-primary transition-colors"
                                >
                                  <Camera className="h-8 w-8 mb-1 opacity-50 group-hover:opacity-100" />
                                  <span className="text-[10px] font-medium uppercase tracking-wider">{isPrimary ? "Primary" : "Gallery"}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </CldUploadWidget>
                      ) : (
                        <div 
                          onClick={() => toast.error("Cloudinary is not configured.")}
                          className="relative h-28 w-28 md:h-32 md:w-32 rounded-2xl overflow-hidden bg-muted cursor-pointer group border-2 border-dashed border-border"
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                            <Camera className="h-8 w-8 mb-1 opacity-50" />
                            <span className="text-[10px] font-medium text-center px-2">Needs Setup</span>
                          </div>
                        </div>
                      )}

                      {currentPhoto ? (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setPhotos(prev => prev.filter((_, i) => i !== idx));
                          }}
                        >
                          <X className="h-3 w-3 mr-1" /> Remove
                        </Button>
                      ) : (
                        <div className="h-7" /> // placeholder to keep alignment
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">Upload clear, recent photos. The first photo will be your primary avatar.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Rahul Sharma" {...register("fullName")} />
                {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" placeholder="28" {...register("age")} />
                {errors.age && <p className="text-xs text-destructive">{errors.age.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(val) => val && setValue("gender", val as "Male" | "Female" | "Other")} value={watch("gender")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion">Religion</Label>
                <Select onValueChange={(val) => val && setValue("religion", val as string)} value={watch("religion") || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Muslim">Muslim</SelectItem>
                    <SelectItem value="Sikh">Sikh</SelectItem>
                    <SelectItem value="Christian">Christian</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.religion && <p className="text-xs text-destructive">{errors.religion.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <Select onValueChange={(val) => val && setValue("maritalStatus", val as string)} value={watch("maritalStatus") || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Never Married">Never Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Awaiting Divorced">Awaiting Divorce</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && <p className="text-xs text-destructive">{errors.maritalStatus.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherTongue">Mother Tongue</Label>
                <Input id="motherTongue" placeholder="Hindi, English, etc." {...register("motherTongue")} />
                {errors.motherTongue && <p className="text-xs text-destructive">{errors.motherTongue.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="community">Community / Caste</Label>
                <Input id="community" placeholder="e.g. Brahmin, Sunni, etc." {...register("community")} />
                {errors.community && <p className="text-xs text-destructive">{errors.community.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input id="height" type="number" placeholder="175" {...register("height")} />
                {errors.height && <p className="text-xs text-destructive">{errors.height.message}</p>}
              </div>
            </div>
          </div>

          {/* STEP 2: PROFESSIONAL */}
          <div className={currentStep === 1 ? "block animate-in fade-in slide-in-from-right-4" : "hidden"}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession / Job Title</Label>
                <Input id="profession" placeholder="Software Engineer at Google" {...register("profession")} />
                {errors.profession && <p className="text-xs text-destructive">{errors.profession.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Highest Education</Label>
                <Select onValueChange={(val) => val && setValue("education", val as string)} value={watch("education") || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bachelors">Bachelor&apos;s Degree</SelectItem>
                    <SelectItem value="Masters">Master&apos;s Degree</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && <p className="text-xs text-destructive">{errors.education.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <Select onValueChange={(val) => val && setValue("income", val as string)} value={watch("income") || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-5L">0 - 5 Lakhs</SelectItem>
                    <SelectItem value="5L-10L">5 - 10 Lakhs</SelectItem>
                    <SelectItem value="10L-20L">10 - 20 Lakhs</SelectItem>
                    <SelectItem value="20L+">20+ Lakhs</SelectItem>
                  </SelectContent>
                </Select>
                {errors.income && <p className="text-xs text-destructive">{errors.income.message}</p>}
              </div>
            </div>
          </div>

          {/* STEP 3: LIFESTYLE */}
          <div className={currentStep === 2 ? "block animate-in fade-in slide-in-from-right-4" : "hidden"}>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Mumbai" {...register("city")} />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Maharashtra" {...register("state")} />
                  {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests & Hobbies</Label>
                <Input id="interests" placeholder="Reading, Traveling, Photography (comma separated)" {...register("interests")} />
                {errors.interests && <p className="text-xs text-destructive">{errors.interests.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About Me</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Write a little bit about yourself, your values, and what you are looking for..." 
                  className="min-h-[120px] resize-none"
                  {...register("bio")} 
                />
                <div className="flex justify-between">
                  {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
                  <p className="text-xs text-muted-foreground ml-auto">{watch("bio")?.length || 0}/500</p>
                </div>
              </div>
            </div>
          </div>

        </form>
      </CardContent>

      <CardFooter className="bg-muted/20 border-t border-border/50 py-6 px-6 md:px-10 flex justify-between">
        <Button 
          variant="outline" 
          onClick={processPrev} 
          disabled={currentStep === 0 || isSubmitting}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={processNext}>
            Next Step <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting || !isValid}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
            {isEditing ? "Update Profile" : "Complete Profile"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
