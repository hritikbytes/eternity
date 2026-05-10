"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { User2 } from "lucide-react";

/**
 * UserAvatar – renders the signed-in user's avatar in the nav.
 *
 * Performance notes:
 * - Selects only `avatar_url` instead of `*` to minimise payload.
 * - Shows a stable placeholder size to prevent layout shift while loading.
 */
export function UserAvatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchAvatar() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user || cancelled) return;

        const { data } = await supabase
          .from("profiles")
          .select("avatar_url") // only fetch the one column we need
          .eq("id", user.id)
          .maybeSingle(); // returns null instead of error when row missing

        if (!cancelled) setAvatarUrl(data?.avatar_url ?? null);
      } catch {
        // silently fail – avatar is non-critical
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    fetchAvatar();
    return () => { cancelled = true; };
  }, []);

  return (
    <Link
      href="/profile"
      className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 hover:bg-primary/20 transition-colors overflow-hidden shrink-0"
      aria-label="View my profile"
    >
      {/* Stable 32×32 placeholder prevents CLS while loading */}
      {avatarUrl && ready ? (
        <Image
          src={avatarUrl.split(',')[0]}
          alt="My avatar"
          width={32}
          height={32}
          className="object-cover w-full h-full"
          unoptimized={false}
        />
      ) : (
        <User2 className="h-5 w-5" aria-hidden="true" />
      )}
    </Link>
  );
}
