"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Heart, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";
import { sendInterest, checkInterestStatus } from "../actions/interest-actions";
import { InterestStatus } from "../types/interest.types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface InterestButtonProps {
  profileId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost";
}

export function InterestButton({ profileId, className, size = "default", variant = "default" }: InterestButtonProps) {
  const [status, setStatus] = useState<InterestStatus | null>(null);
  const [isSender, setIsSender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadStatus() {
      try {
        const { status: currentStatus, isSender: senderStatus } = await checkInterestStatus(profileId);
        setStatus(currentStatus);
        setIsSender(senderStatus);
      } catch (error) {
        console.error("Failed to load interest status", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStatus();
  }, [profileId]);

  const handleSendInterest = () => {
    startTransition(async () => {
      // Optimistic Update
      setStatus("pending");
      setIsSender(true);
      
      try {
        await sendInterest(profileId);
        toast.success("Interest sent successfully!");
      } catch (error: unknown) {
        // Revert on failure
        setStatus(null);
        setIsSender(false);
        toast.error(error instanceof Error ? error.message : "Failed to send interest");
      }
    });
  };

  if (isLoading) {
    return (
      <Button variant="secondary" size={size} disabled className={className}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  // If accepted, show connection state
  if (status === "accepted") {
    return (
      <Button variant="secondary" size={size} className={cn("bg-green-500/10 text-green-600 hover:bg-green-500/20", className)} disabled>
        <CheckCircle2 className="mr-2 h-4 w-4" /> Connected
      </Button>
    );
  }

  // If rejected, show visually disabled state
  if (status === "rejected") {
    return (
      <Button variant="ghost" size={size} className={className} disabled>
        <XCircle className="mr-2 h-4 w-4" /> Declined
      </Button>
    );
  }

  // If pending and current user sent it
  if (status === "pending" && isSender) {
    return (
      <Button variant="secondary" size={size} className={className} disabled>
        <Clock className="mr-2 h-4 w-4" /> Request Sent
      </Button>
    );
  }

  // If pending and current user received it
  if (status === "pending" && !isSender) {
    return (
      <Button 
        variant="default" 
        size={size} 
        className={className} 
        onClick={() => window.location.href = "/requests"}
      >
        Respond to Request
      </Button>
    );
  }

  // Default: Send Interest
  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleSendInterest} 
      disabled={isPending}
      className={className}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Heart className="mr-2 h-4 w-4" /> Send Interest
        </>
      )}
    </Button>
  );
}
