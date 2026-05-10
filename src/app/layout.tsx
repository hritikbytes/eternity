import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { SimpleThemeProvider } from "@/components/providers/simple-theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eternity-matrimony.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Eternity Matrimony - Find Your Perfect Life Partner",
    template: "%s | Eternity Matrimony",
  },
  icons: [
    {
      rel: "icon",
      url: "/logo.svg",
    },
  ],
  description:
    "India's most trusted and elegant premium matchmaking platform. Connect with verified professionals and find your life partner with AI-powered compatibility matching.",
  keywords: [
    "matrimony",
    "matchmaking",
    "marriage",
    "Indian matrimony",
    "premium matrimony",
    "verified profiles",
    "find life partner",
    "wedding",
  ],
  authors: [{ name: "Eternity Matrimony" }],
  creator: "Eternity Matrimony",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Eternity Matrimony",
    title: "Eternity Matrimony - Find Your Perfect Life Partner",
    description:
      "India's most trusted premium matchmaking platform. AI-powered compatibility, verified profiles, and luxurious privacy controls.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eternity Matrimony – Find Your Perfect Life Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eternity Matrimony – Find Your Perfect Life Partner",
    description:
      "India's most trusted premium matchmaking platform. AI-powered compatibility, verified profiles.",
    images: ["/og-image.png"],
    creator: "@eternitymatrimony",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c22" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external origins for faster DNS resolution */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <SimpleThemeProvider>
          {children}
          <Toaster position="top-center" richColors />
        </SimpleThemeProvider>
      </body>
    </html>
  );
}
