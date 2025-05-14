import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google'
import Header from "@/components/header/HeaderComponent";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins",
});


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quiero Sport",
  description: "Quiero Sport Clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} ${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <SessionProviderWrapper>
              <Header/>
              {children}
          </SessionProviderWrapper>
      </body>
    </html>
  );
}
