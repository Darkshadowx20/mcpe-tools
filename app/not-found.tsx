'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function NotFound() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-center px-4 relative overflow-hidden">
      {/* Floating particles - only render on client */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none -z-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-cyan to-blue-light opacity-20 animate-float"
              style={{
                width: `${Math.random() * 32 + 16}px`,
                height: `${Math.random() * 32 + 16}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 12 + 8}s`,
                animationDelay: `${Math.random() * 6}s`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </div>
      )}
      <div className="mb-6 flex flex-col items-center">
        <span className="inline-block text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-cyan via-purple to-blue-light bg-clip-text text-transparent animate-text-shimmer drop-shadow-lg glow-text" style={{backgroundSize:'200% auto'}}>404</span>
        <span className="text-4xl md:text-5xl mt-2">🪓</span>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-cyan mb-3 glow-text">Lost in the MCPE Tools?</h1>
      <p className="text-muted mb-8 max-w-md mx-auto text-base md:text-lg">
        Oops! This page is as empty as a freshly generated Minecraft world.<br />
        Let’s get you back to crafting something awesome!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="px-7 py-3 rounded-md bg-gradient-to-r from-cyan to-blue-light text-white font-semibold shadow-glow hover:scale-105 transition-transform text-base md:text-lg">
          🏠 Go Home
        </Link>
        <Link href="/skintototem" className="px-7 py-3 rounded-md bg-gradient-to-r from-purple to-cyan text-white font-semibold shadow-glow hover:scale-105 transition-transform text-base md:text-lg">
          🧑‍🎨 Try Skin to Totem
        </Link>
      </div>
    </div>
  );
} 