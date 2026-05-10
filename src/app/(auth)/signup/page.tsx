import type { Metadata } from "next";
import { SignupForm } from "@/features/auth/components/signup-form";

export const metadata: Metadata = {
  title: "Create Account – Start Your Journey",
  description: "Join Eternity Matrimony for free. Create your verified profile and find your perfect life partner today.",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return <SignupForm />;
}
