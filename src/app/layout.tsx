import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JournAI — Your thoughts, understood.",
  description:
    "An AI-powered journal that builds a living profile of your inner world. Track moods, discover patterns, and understand yourself better.",
  keywords: ["journal", "AI", "mood tracking", "mental wellness", "self-reflection"],
  openGraph: {
    title: "JournAI — Your thoughts, understood.",
    description:
      "An AI-powered journal that builds a living profile of your inner world.",
    url: "https://journai.mehdi.ch",
    siteName: "JournAI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
