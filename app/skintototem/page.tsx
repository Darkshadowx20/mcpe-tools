import SkinConverter from "../components/SkinConverter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skin to Totem Converter",
  description: "Convert your Minecraft skin into a custom totem of undying. Free online tool for Minecraft Pocket Edition (MCPE) and Bedrock Edition players.",
  keywords: [
    "minecraft skin converter", "totem of undying", "custom totem", 
    "minecraft pocket edition", "mcpe", "bedrock edition", 
    "minecraft skin to totem", "minecraft resource pack"
  ],
  alternates: {
    canonical: 'https://tools.notnicto.com/skintototem',
  },
  openGraph: {
    title: "Minecraft Skin to Totem Converter | MCPE Tools",
    description: "Transform your Minecraft character skin into a custom totem of undying with our free online converter tool.",
    url: 'https://tools.notnicto.com/skintototem',
    images: [
      {
        url: 'https://tools.notnicto.com/skin-to-totem-og.png',
        width: 1200,
        height: 630,
        alt: 'Minecraft Skin to Totem Converter',
      },
    ],
  },
};

export default function SkinToTotemPage() {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white py-8 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#61dafb] to-[#c678dd] inline-block text-transparent bg-clip-text">
            Minecraft Skin to Totem Converter
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Transform your Minecraft character into a custom totem of undying with our easy-to-use converter
          </p>
        </header>
        
        <SkinConverter />
        
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">About This Tool</h2>
          <p className="text-gray-300">
            This tool allows you to convert your Minecraft character skin into a
            custom totem of undying texture. Simply upload your skin file to get
            started. The tool will generate a complete resource pack (.mcpack)
            that you can install directly in Minecraft.
          </p>
        </div>
      </div>
    </div>
  );
} 