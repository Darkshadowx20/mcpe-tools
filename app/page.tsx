import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://tools.notnicto.com',
  },
  openGraph: {
    title: 'MCPE Tools - Minecraft Pocket Edition Utilities',
    description: 'Free tools and utilities for Minecraft Pocket Edition players - convert skins to totems, create texture packs and more.',
    url: 'https://tools.notnicto.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white">
      {/* Image background with slider */}
      <HeroSection 
        backgrounds={[
          '/images/bg.png',
          '/images/bg.png', // Add more background images here
        ]}
        overlayOpacity={0.75}
      />

      <FeaturesSection />
    </div>
  );
}
