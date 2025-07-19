'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#sidebar') && !target.closest('#sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSidebarOpen]);

  // Disable body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-secondary/95 backdrop-blur-md shadow-lg border-b border-secondary' 
          : 'bg-primary border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group">
                <div className="h-8 w-8 relative mr-2 transition-transform duration-300 group-hover:scale-110">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan to-purple rounded-lg opacity-0 group-hover:opacity-70 blur-sm transition-opacity duration-300"></div>
                  <div className="relative">
                    <Image 
                      src="/logo.png" 
                      alt="Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
                <span className="text-xl font-bold text-blue-light group-hover:text-cyan transition-colors duration-300 hidden sm:inline">
                  MCPE Tools
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink href="/" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                Home
              </NavLink>
              <NavLink href="/skintototem" icon="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                Skin to Totem
              </NavLink>
              <NavLink href="/textures" icon="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                Texture Packs
              </NavLink>
              <NavLink href="/tools" icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                More Tools
              </NavLink>
            </div>

            {/* Hamburger menu button (moved to right side) */}
            <button 
              id="sidebar-toggle"
              className="md:hidden text-cyan hover:text-purple transition-colors duration-300 p-1 rounded-md hover:bg-tertiary/20"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar Navigation - Changed to open from right side */}
      <aside 
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-secondary shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden border-l border-secondary`}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between p-4 border-b border-secondary">
          <Link href="/" className="flex items-center">
            <div className="h-8 w-8 relative mr-2">
              <Image 
                src="/logo.png" 
                alt="Logo"
                fill
                className="object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <span className="text-xl font-bold text-blue-light">
              MCPE Tools
            </span>
          </Link>
          {/* Improved close button */}
          <button 
            className="text-muted hover:text-primary p-2 rounded-full hover:bg-tertiary/50 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="p-4">
          <ul className="space-y-2">
            <SidebarLink 
              href="/" 
              icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </SidebarLink>
            <SidebarLink 
              href="/skintototem" 
              icon="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              onClick={() => setIsSidebarOpen(false)}
            >
              Skin to Totem
            </SidebarLink>
            <SidebarLink 
              href="/textures" 
              icon="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              onClick={() => setIsSidebarOpen(false)}
            >
              Texture Packs
            </SidebarLink>
            <SidebarLink 
              href="/skins" 
              icon="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
              onClick={() => setIsSidebarOpen(false)}
            >
              Skin Designer
            </SidebarLink>
            <SidebarLink 
              href="/worlds" 
              icon="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              onClick={() => setIsSidebarOpen(false)}
            >
              World Generator
            </SidebarLink>
            <SidebarLink 
              href="/tools" 
              icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              onClick={() => setIsSidebarOpen(false)}
            >
              More Tools
            </SidebarLink>
          </ul>
        </nav>
      </aside>
    </>
  );
}

// NavLink component for desktop navigation
function NavLink({ href, icon, children }: { href: string; icon: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="group relative px-3 py-2 rounded-md text-sm font-medium flex items-center overflow-hidden"
    >
      <span className="absolute inset-0 bg-tertiary/0 group-hover:bg-tertiary/30 transition-colors duration-300 rounded-md"></span>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan to-purple group-hover:w-full transition-all duration-300"></span>
      <svg className="w-5 h-5 mr-1.5 text-cyan group-hover:text-purple transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
      </svg>
      <span className="relative text-secondary group-hover:text-primary transition-colors duration-300">{children}</span>
    </Link>
  );
}

// SidebarLink component for mobile navigation
function SidebarLink({ href, icon, onClick, children }: { href: string; icon: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="flex items-center px-4 py-2 text-secondary hover:bg-tertiary/50 rounded-md transition-all duration-300 group"
        onClick={onClick}
      >
        <div className="relative mr-3">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan to-purple rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
          <svg className="w-5 h-5 relative text-cyan group-hover:text-purple transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        </div>
        <span className="group-hover:translate-x-1 transition-transform duration-300">{children}</span>
      </Link>
    </li>
  );
} 