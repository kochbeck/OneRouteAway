import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClerkAuthProvider from "./components/ClerkAuthProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Route Away",
  description: "Find merchants along transit routes in San Francisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkAuthProvider>
          {children}
        </ClerkAuthProvider>
      </body>
    </html>
  );
}
