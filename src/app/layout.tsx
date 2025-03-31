import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Logo } from "@/components/ui/logo";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import LoaderProvider from "@/components/LoaderProvider";
import ClientBody from "@/components/ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill Arena - Master the Skills of Tomorrow",
  description: "Learn in-demand skills with expert-led courses at Skill Arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientBody className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LoaderProvider>
          <SmoothScroll>
            <Logo />
            <Nav />
            {children}
            <Footer />
          </SmoothScroll>
        </LoaderProvider>
      </ClientBody>
    </html>
  );
}
