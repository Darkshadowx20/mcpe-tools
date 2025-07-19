'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FeaturesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    const section = document.getElementById('features-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const features = [
    {
      id: 0,
      title: "Skin to Totem Converter",
      description: "Transform your Minecraft character skin into a custom totem of undying texture with just a few clicks.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/skintototem",
      isAvailable: true,
      color: "from-cyan-500 to-blue-500",
      hoverColor: "group-hover:from-cyan-600 group-hover:to-blue-600",
      textColor: "text-cyan-400",
      iconBg: "bg-cyan-900/30",
      delay: 0
    },
    {
      id: 1,
      title: "Texture Pack Creator",
      description: "Create custom resource packs with our easy-to-use generator. Customize textures, models, and more.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      link: "/textures",
      isAvailable: false,
      color: "from-purple-500 to-pink-500",
      hoverColor: "group-hover:from-purple-600 group-hover:to-pink-600",
      textColor: "text-purple-400",
      iconBg: "bg-purple-900/30",
      delay: 100
    },
    {
      id: 2,
      title: "Skin Designer",
      description: "Design your own Minecraft skins with our intuitive editor. No artistic skills required!",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
      ),
      link: "/skins",
      isAvailable: false,
      color: "from-blue-500 to-indigo-500",
      hoverColor: "group-hover:from-blue-600 group-hover:to-indigo-600",
      textColor: "text-blue-400",
      iconBg: "bg-blue-900/30",
      delay: 200
    },
    {
      id: 3,
      title: "World Generator",
      description: "Create custom world seeds and templates for your Minecraft Pocket Edition adventures.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: "/worlds",
      isAvailable: false,
      color: "from-green-500 to-teal-500",
      hoverColor: "group-hover:from-green-600 group-hover:to-teal-600",
      textColor: "text-green-400",
      iconBg: "bg-green-900/30",
      delay: 300
    }
  ];

  return (
    <div id="features-section" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0a0b10]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Section header */}
      <div className={`relative text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-block mb-3">
          <span className="text-sm font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 uppercase">
            Powerful Tools
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#61dafb] to-[#c678dd] inline-block text-transparent bg-clip-text">
          MCPE Tools Collection
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Enhance your Minecraft Pocket Edition experience with our growing collection of tools and utilities
        </p>
        <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 w-24 h-1.5 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
      
      {/* Features grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className={`group relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: `${feature.delay}ms` }}
            onMouseEnter={() => setHoveredCard(feature.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 bg-[#0f1218] rounded-2xl p-6 h-full border border-gray-800/50 backdrop-blur-sm shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-700/60 group-hover:-translate-y-2 overflow-hidden">
              {/* Hover effect glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-300`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`}></div>
                <div className={`relative z-10 ${feature.textColor}`}>
                  {feature.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-6 min-h-[4.5rem]">
                {feature.description}
              </p>
              
              {/* Action */}
              {feature.isAvailable ? (
                <Link 
                  href={feature.link}
                  className={`inline-flex items-center ${feature.textColor} group-hover:text-white transition-colors relative`}
                >
                  <span className="relative z-10">Try it now</span>
                  <svg 
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${hoveredCard === feature.id ? 'translate-x-1' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${feature.color} transition-all duration-300 ${hoveredCard === feature.id ? 'w-full' : ''}`}></div>
                </Link>
              ) : (
                <div className="inline-flex items-center text-gray-500 relative">
                  <span className="relative z-10">Coming Soon</span>
                  <svg 
                    className={`w-5 h-5 ml-2 transition-transform duration-300 ${hoveredCard === feature.id ? 'rotate-45' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gray-700 transition-all duration-300 ${hoveredCard === feature.id ? 'w-full' : ''}`}></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom decoration */}
      <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#0f1218] to-[#0f1218] border border-gray-800/50 text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          More tools coming soon
        </div>
      </div>
    </div>
  );
} 