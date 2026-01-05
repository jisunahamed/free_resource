import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Changed to Inter
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Open Learning Platform",
  description: "Free tools and learning resources for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-text base-bg`}>
        {children}
      </body>
    </html>
  );
}
