"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupSchema, type SignupFormValues } from "../types/auth.types";
import { signUp } from "../actions/auth.actions";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await signUp(formData);

    if (result?.error) {
      toast.error(result.error);
    } else if (result?.success) {
      toast.success("Account created successfully!");
      setIsSuccess(true);
    }
    setIsLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-heading font-semibold tracking-tight">Check your email</h2>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification link to your email address. Please verify your account to continue.
        </p>
        <Link href="/login" className={buttonVariants({ className: "mt-4" })}>Return to Login</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-card p-8 md:p-10 rounded-[2rem] shadow-xl border border-border/50 max-w-md w-full mx-auto relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="space-y-3 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-foreground">Create an account</h2>
        <p className="text-sm md:text-base text-muted-foreground font-light">
          Join Eternity to find your perfect match
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...register("email")}
            className={`h-12 px-4 rounded-xl bg-background border-border/50 focus-visible:ring-primary/20 transition-all ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password")}
            className={`h-12 px-4 rounded-xl bg-background border-border/50 focus-visible:ring-primary/20 transition-all ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="confirmPassword" className="text-foreground/80 font-medium">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            disabled={isLoading}
            {...register("confirmPassword")}
            className={`h-12 px-4 rounded-xl bg-background border-border/50 focus-visible:ring-primary/20 transition-all ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Button className="w-full h-12 rounded-xl text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 mt-2" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Continue
        </Button>
      </form>
      <div className="text-center text-sm font-medium text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  );
}
