import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Eternity Matrimony account to view matches, manage your profile, and connect with verified profiles.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <LoginForm />;
}
