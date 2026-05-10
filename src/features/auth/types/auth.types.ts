import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }).max(254),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(128, { message: "Password is too long." })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter." })
    .regex(/[0-9]/, { message: "Password must include a number." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
