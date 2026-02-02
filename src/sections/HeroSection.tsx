import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Radar, Satellite } from 'lucide-react';
import { DashboardOverlay } from '../components/effects/DashboardOverlay';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Simple entrance animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    const words = headlineRef.current?.querySelectorAll('.word');
    if (words && words.length > 0) {
      tl.fromTo(words,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.04 },
        0.1
      );
    }

    if (portraitRef.current) {
      tl.fromTo(portraitRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.2
      );
    }

    tl.fromTo([metaRef.current, ctaRef.current],
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
      0.3
    );

  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('featured-work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-full min-h-screen flex items-center overflow-hidden ${className}`}
      style={{ backgroundColor: '#07080B' }}
    >
      {/* Animated Tactical Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base background image */}
        <img
          src="/hero_bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          style={{ filter: 'brightness(0.3) contrast(1.15)' }}
        />

        {/* Animated radar sweep effect */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-20">
            <div
              className="w-full h-full rounded-full border-2 border-[#2D6BFF]/40 animate-radar-sweep"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(45, 107, 255, 0.3) 360deg)',
              }}
            />
          </div>
        </div>

        {/* Grid overlay - tactical map style */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" className="w-full h-full">
            <defs>
              <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2D6BFF" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Animated connection lines - network effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2D6BFF" stopOpacity="0" />
                <stop offset="50%" stopColor="#2D6BFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2D6BFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="20%" y1="80%" x2="40%" y2="60%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse">
              <animate attributeName="x1" values="20%;25%;20%" dur="4s" repeatCount="indefinite" />
              <animate attributeName="y1" values="80%;75%;80%" dur="4s" repeatCount="indefinite" />
            </line>
            <line x1="60%" y1="90%" x2="80%" y2="70%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }}>
              <animate attributeName="x1" values="60%;65%;60%" dur="5s" repeatCount="indefinite" />
              <animate attributeName="y1" values="90%;85%;90%" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="10%" y1="60%" x2="30%" y2="80%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '2s' }}>
              <animate attributeName="x1" values="10%;15%;10%" dur="6s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>

        {/* Pulsing dots - like units on a tactical map */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-[30%] left-[15%] w-2 h-2 rounded-full bg-[#2D6BFF] animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute top-[50%] right-[20%] w-2 h-2 rounded-full bg-[#00FF88] animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute bottom-[30%] left-[25%] w-2 h-2 rounded-full bg-[#FF6B6B] animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BFF]/5 to-transparent h-[20%] animate-scan-line" />
        </div>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07080B]/95 via-[#07080B]/70 to-[#07080B]/90 z-[1]" />

      {/* Tactical HUD elements - desktop only */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 hidden sm:block">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-[#0E111A]/80 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Satellite size={12} className="text-[#2D6BFF]" />
              <span className="text-[10px] text-[#A6AFBF] font-mono">3 UNITS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Dashboard Overlay */}
      <DashboardOverlay position="bottom-right" className="hidden lg:block" />

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-[6vw] py-12 md:py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
            {/* Left: Headline */}
            <div ref={headlineRef} className="space-y-3 md:space-y-4 text-center lg:text-left">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2D6BFF]/10 border border-[#2D6BFF]/30 mb-4">
                <Radar size={14} className="text-[#2D6BFF]" />
                <span className="text-xs text-[#2D6BFF] font-semibold tracking-wide">MISSION READY</span>
              </div>

              <h1
                className="text-[clamp(26px,4.5vw,48px)] md:text-[clamp(30px,4vw,56px)] font-bold text-[#F2F5FA] leading-[1.15]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="word inline-block">Principal</span>{' '}
                <span className="word inline-block text-gradient">AI/Full-Stack</span>{' '}
                <span className="word inline-block">Engineer</span>
              </h1>

              <p className="text-[13px] sm:text-sm md:text-base text-[#A6AFBF] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                LLM Systems · Tactical Comms · Embedded Linux · ATAK/TAK · Security-Cleared
              </p>
            </div>

            {/* Right: Portrait Card */}
            <div
              ref={portraitRef}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[260px] xl:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#0E111A] group">
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2D6BFF] via-transparent to-[#00D9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-rotate" style={{ padding: '2px' }} />

                <img
                  src="/hero_portrait.jpg"
                  alt="Jabbir Basha - Principal AI/Full-Stack Engineer"
                  className="relative w-full h-full object-cover object-top"
                  loading="eager"
                  style={{
                    imageRendering: 'auto',
                    filter: 'contrast(1.15) saturate(1.2) brightness(1.05)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/70 via-transparent to-transparent" />

                {/* HUD overlay corners */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[#2D6BFF]/50" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[#2D6BFF]/50" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[#2D6BFF]/50" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[#2D6BFF]/50" />

                {/* Overlay badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#2D6BFF]/90 backdrop-blur-sm text-[#07080B] text-[10px] font-semibold">
                    15+ Years
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0E111A]/80 backdrop-blur-sm text-[#F2F5FA] text-[10px] font-semibold border border-white/10">
                    Lead AI @ DoodleLabs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-8 md:left-[6vw] md:right-[6vw] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div ref={metaRef}>
              <p className="text-[10px] sm:text-xs text-[#A6AFBF] text-center sm:text-left">
                Singapore · FIPS 140-2 · MASVS L2 · Defense Projects
              </p>
            </div>

            <div ref={ctaRef}>
              <button
                onClick={scrollToWork}
                className="flex items-center gap-2 text-[#2D6BFF] font-medium text-sm"
              >
                Explore work
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
