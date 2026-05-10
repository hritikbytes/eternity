import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Allowed hosts for post-authentication redirects.
 * Prevents open-redirect attacks through the callback URL.
 */
function isAllowedRedirectPath(path: string): boolean {
  // Must be a relative path, not a protocol-relative URL
  return path.startsWith("/") && !path.startsWith("//");
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next") ?? "/dashboard";

  // Sanitize the redirect target
  const next = isAllowedRedirectPath(rawNext) ? rawNext : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${requestUrl.origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${requestUrl.origin}${next}`);
      }
    }
  }

  // Don't include the raw error message in the URL — it could leak info
  return NextResponse.redirect(
    `${requestUrl.origin}/login?error=auth_failed`
  );
}
