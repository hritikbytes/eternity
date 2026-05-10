import { z } from "zod";

export const searchFiltersSchema = z.object({
  ageRange: z.tuple([z.number(), z.number()]).default([18, 50]),
  religion: z.array(z.string()).default([]),
  caste: z.array(z.string()).default([]),
  profession: z.array(z.string()).default([]),
  city: z.string().optional(),
  education: z.array(z.string()).default([]),
  income: z.array(z.string()).default([]),
  maritalStatus: z.array(z.string()).default([]),
  page: z.number().default(1),
});

export type SearchFilters = z.infer<typeof searchFiltersSchema>;
