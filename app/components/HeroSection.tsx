'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  backgrounds?: string[];
  overlayOpacity?: number;
  overlayColor?: string;
  sliderInterval?: number; // ms
}

const DEFAULT_BACKGROUNDS = [
  '/images/bg.png',
  '/images/bg.png', // You can add more images here
];

export default function HeroSection({
  backgrounds = DEFAULT_BACKGROUNDS,
  overlayOpacity = 0.7,
  overlayColor = '#0a0b10',
  sliderInterval = 6000,
}: HeroSectionProps) {
  const [isClient, setIsClient] = useState(false);
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to advance to next slide
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length);
      setFade(false);
    }, 350);
  };

  // Slider auto-advance
  useEffect(() => {
    if (!isClient) return;
    if (backgrounds.length <= 1) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, sliderInterval);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [current, isClient, backgrounds.length, sliderInterval]);

  return (
    <div 
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background slider */}
      <div className="absolute inset-0 w-full h-full z-0">
        {backgrounds.map((src, idx) => (
          <div
            key={src + idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${idx === current && !fade ? 'opacity-100' : 'opacity-0'} ${fade && idx === current ? 'opacity-0' : ''}`}
            style={{
              backgroundImage: isClient ? `url(${src})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'opacity 0.5s',
            }}
            aria-hidden={idx !== current}
          />
        ))}
        {/* Enhanced overlay with more dynamic gradient */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            backgroundImage: 'linear-gradient(135deg, rgba(10,11,16,0.8) 0%, rgba(10,11,16,0.4) 50%, rgba(10,11,16,0.8) 100%)',
          }}
        />
      </div>

      {/* Enhanced particles effect - only render on client */}
      {isClient && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white opacity-70 animate-float"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Content with refined design */}
      <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Refined title section with better animations */}
          <div className="space-y-8">
            {/* Minecraft badge with enhanced glow */}
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#ff00ff]/30 to-[#00ffff]/30 rounded-lg blur-xl animate-pulse"></div>
              <h2 className="relative text-xl font-bold tracking-widest text-gray-200 bg-[#1a1c2a]/80 px-8 py-3 rounded-md border-2 border-[#3a3f59] uppercase">
                Minecraft Pocket Edition
              </h2>
            </div>
            
            {/* Main title with enhanced gradient and animation */}
            <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#ff00ff] via-[#ff66ff] to-[#00ffff] animate-pulse">
              MCPE TOOLS
            </h1>
            
            {/* Subtitle with animated underline */}
            <div className="relative inline-block">
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                <span className="text-yellow-300">⚒️</span> ENHANCE YOUR MINECRAFT EXPERIENCE <span className="text-yellow-300">⚒️</span>
              </p>
              <div className="h-0.5 w-0 bg-gradient-to-r from-[#4d5bce] to-[#7963d2] mt-2 mx-auto animate-expand"></div>
            </div>
          </div>
          
          {/* Enhanced CTA button with better hover effects */}
          <div className="pt-10">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4d5bce] to-[#7963d2] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Link 
                href="/skintototem" 
                className="relative px-12 py-5 bg-gradient-to-br from-[#4d5bce] to-[#7963d2] text-white text-xl font-bold rounded-md transition-all hover:shadow-[0_0_25px_rgba(125,99,210,0.5)] hover:scale-105 inline-block uppercase tracking-wider"
              >
                GET STARTED
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-30 pointer-events-none">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add these to your global CSS or Tailwind config if not present:
// @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-40px); } }
// .animate-float { animation: float 6s ease-in-out infinite alternate; }
// @keyframes expand { 0% { width: 0; } 100% { width: 100%; } }
// .animate-expand { animation: expand 2s ease-out forwards; } 