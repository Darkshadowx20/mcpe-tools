'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('2025');
  
  // Get current year for copyright
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-primary border-t border-secondary shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Logo and Copyright - Centered on mobile, normal on larger screens */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start items-center mb-2 sm:mb-0 transition-all hover:scale-[1.01]">
          <div className="flex items-center gap-2">
            <Link href="/" aria-label="Home">
              <Image 
                src="/logo.png" 
                alt="MCPE Tools Logo" 
                width={24} 
                height={24} 
                className="image-pixelated"
              />
            </Link>
            <span className="text-secondary whitespace-nowrap">
              <span className="text-blue">©</span> {currentYear} <span className="gradient-text font-medium">tools.notnicto.com</span>
            </span>
          </div>
        </div>
        
        {/* Center: Links - Centered on all screens */}
        <div className="flex items-center justify-center space-x-4 md:space-x-6 mb-2 sm:mb-0 order-3 sm:order-2">
          <Link href="/terms" className="relative group px-1">
            <span className="text-secondary hover:text-cyan transition-colors">Terms</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/privacy" className="relative group px-1">
            <span className="text-secondary hover:text-cyan transition-colors">Privacy Policy</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/support" className="relative group px-1">
            <span className="text-secondary hover:text-cyan transition-colors">Support</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        {/* Right: Disclaimer - Full width on mobile, normal on larger screens */}
        <div className="w-full sm:w-auto text-center sm:text-right order-2 sm:order-3 mb-2 sm:mb-0">
          <p className="text-muted whitespace-nowrap hover:text-secondary transition-colors duration-300">
            Not affiliated with Mojang or Microsoft
          </p>
        </div>
      </div>
      
      {/* Structured data for SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MCPE Tools",
            "url": "https://tools.notnicto.com"
          })
        }}
      />
    </footer>
  );
} 