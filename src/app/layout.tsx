import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserPlanProvider } from "@/contexts/UserPlanContext";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlanifyGCSE - Smart Revision Planning for Students",
  description: "Plan, track and structure your GCSE revision effectively. Use PlanifyGCSE's intelligent revision planning tool to plan and ace your exams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <AuthProvider>
          <UserPlanProvider>
            {children}
          </UserPlanProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
