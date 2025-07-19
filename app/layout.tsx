import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.notnicto.com'),
  title: {
    default: "MCPE Tools - Minecraft Pocket Edition Utilities",
    template: "%s | MCPE Tools"
  },
  description: "Enhance your Minecraft Pocket Edition experience with our free tools - skin to totem converter, texture packs, and more custom utilities for Minecraft PE players.",
  keywords: [
    "minecraft", "mcpe", "pocket edition", "totem", "skin converter", 
    "texture pack", "mcpack", "tools", "minecraft tools", "bedrock edition",
    "minecraft skin", "custom totem", "totem of undying", "minecraft utilities"
  ],
  authors: [{ name: "NotNicto" }],
  creator: "NotNicto",
  publisher: "NotNicto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.notnicto.com',
    siteName: 'MCPE Tools',
    title: 'MCPE Tools - Minecraft Pocket Edition Utilities',
    description: 'Free tools and utilities for Minecraft Pocket Edition players - convert skins to totems, create texture packs and more.',
    images: [
      {
        url: 'https://tools.notnicto.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MCPE Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCPE Tools - Minecraft Pocket Edition Utilities',
    description: 'Free tools and utilities for Minecraft Pocket Edition players - convert skins to totems, create texture packs and more.',
    images: ['https://tools.notnicto.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://tools.notnicto.com',
  },
  manifest: 'https://tools.notnicto.com/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
  verification: {
    google: 'google-site-verification-code', // Replace with your actual verification code
  },
  category: 'tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0b10] text-white pt-16`}
      >
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
