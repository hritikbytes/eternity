import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  age: z.coerce.number().min(18, "Must be at least 18 years old").max(90, "Must be under 90"),
  gender: z.enum(["Male", "Female", "Other"]),
  religion: z.string().min(2, "Please select a religion"),
  maritalStatus: z.string().min(2, "Please select marital status"),
  motherTongue: z.string().min(2, "Mother tongue is required"),
  community: z.string().optional(),
  height: z.coerce.number().min(100, "Height must be realistic").max(250).optional(),
});

export const professionalInfoSchema = z.object({
  profession: z.string().min(2, "Profession is required"),
  education: z.string().min(2, "Education is required"),
  income: z.string().min(1, "Income range is required"),
});

export const lifestyleInfoSchema = z.object({
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  bio: z.string().min(20, "Bio should be at least 20 characters").max(500),
  interests: z.string().min(2, "Add some interests (comma separated)"),
  lifestyle: z.string().optional(),
});

export const profileSchema = personalInfoSchema
  .merge(professionalInfoSchema)
  .merge(lifestyleInfoSchema)
  .extend({
    avatarUrl: z.string().url().optional(),
    isPublic: z.boolean().default(true),
  });

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ProfessionalInfoValues = z.infer<typeof professionalInfoSchema>;
export type LifestyleInfoValues = z.infer<typeof lifestyleInfoSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;

// Partner Preferences
export const partnerPreferenceSchema = z.object({
  ageMin: z.coerce.number().min(18),
  ageMax: z.coerce.number().max(90),
  preferredReligions: z.array(z.string()).optional(),
  preferredProfessions: z.array(z.string()).optional(),
});

export type PartnerPreferenceValues = z.infer<typeof partnerPreferenceSchema>;
