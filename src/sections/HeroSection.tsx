import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
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

  // Simple CSS-based entrance animation (better performance than GSAP)
  useEffect(() => {
    // Only animate on desktop for better mobile performance
    const isDesktop = window.innerWidth >= 1024;

    if (!isDesktop) {
      // On mobile, just fade in everything without GSAP
      if (sectionRef.current) {
        sectionRef.current.style.opacity = '1';
      }
      return;
    }

    // Desktop: simple GSAP entrance
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
      className={`relative w-full min-h-screen flex items-center ${className}`}
      style={{ backgroundColor: '#07080B' }}
    >
      {/* Static image background (no video/particles for better mobile performance) */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero_bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          style={{ filter: 'brightness(0.4) contrast(1.1)' }}
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07080B]/95 via-[#07080B]/70 to-[#07080B]/90 z-[1]" />

      {/* Tactical Dashboard Overlay - desktop only */}
      <DashboardOverlay position="bottom-right" className="hidden lg:block" />

      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-[6vw] py-12 md:py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center">
            {/* Left: Headline */}
            <div ref={headlineRef} className="space-y-3 md:space-y-4 text-center lg:text-left">
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

            {/* Right: Portrait Card - positioned properly on mobile */}
            <div
              ref={portraitRef}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-[180px] sm:w-[220px] md:w-[260px] lg:w-[260px] xl:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-[#0E111A]">
                <img
                  src="/hero_portrait.jpg"
                  alt="Jabbir Basha - Principal AI/Full-Stack Engineer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  style={{
                    imageRendering: 'auto',
                    filter: 'contrast(1.15) saturate(1.2) brightness(1.05)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/70 via-transparent to-transparent" />

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
