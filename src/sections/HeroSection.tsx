import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { AIBackground } from '../components/effects/AIBackground';
import { DashboardOverlay } from '../components/effects/DashboardOverlay';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline words entrance
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(words,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.06 },
          0.2
        );
      }

      // Portrait card entrance (desktop only)
      if (window.innerWidth >= 1024 && portraitRef.current) {
        tl.fromTo(portraitRef.current,
          { x: 50, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.3
        );
      }

      // Meta and CTA entrance
      tl.fromTo([metaRef.current, ctaRef.current],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1,
        }
      });

      // Headline exits left
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: -100, opacity: 0 },
        0.6
      );

      // Portrait exits right (desktop only)
      if (portraitRef.current) {
        scrollTl.fromTo(portraitRef.current,
          { x: 0, opacity: 1 },
          { x: 100, opacity: 0 },
          0.6
        );
      }

      // Meta and CTA fade down
      scrollTl.fromTo([metaRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: 30, opacity: 0, stagger: 0.05 },
        0.65
      );

    }, sectionRef);

    return () => ctx.revert();
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
      className={`section-pinned relative w-full h-screen overflow-hidden ${className}`}
    >
      {/* AI-Powered Background with Particle Network */}
      <AIBackground
        imageSrc="/hero_bg.jpg"
        enableParticles={true}
        enableVideo={true}
        particleColor="#2D6BFF"
        overlayOpacity={0.5}
      />

      {/* Additional gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080B]/90 via-[#07080B]/60 to-transparent z-[1]" />
      <div className="lg:hidden absolute inset-0 bg-[#07080B]/30 z-[1]" />

      {/* Tactical Dashboard Overlay */}
      <DashboardOverlay position="bottom-right" className="hidden lg:block" />

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-[6vw] py-16 md:py-20">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left: Headline */}
            <div ref={headlineRef} className="space-y-4 md:space-y-6 text-center lg:text-left">
              <h1
                className="text-[clamp(28px,5vw,56px)] md:text-[clamp(32px,5vw,64px)] font-bold text-[#F2F5FA] leading-[1.1] md:leading-[0.95]"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                <span className="word inline-block">Principal</span>{' '}
                <span className="word inline-block text-gradient">AI/Full-Stack</span>{' '}
                <span className="word inline-block">Engineer</span>
              </h1>

              <p className="text-[14px] sm:text-base md:text-lg lg:text-xl text-[#A6AFBF] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                LLM Systems · Tactical Comms · Embedded Linux · ATAK/TAK · Security-Cleared
              </p>

              {/* Mobile credentials */}
              <div className="lg:hidden flex flex-wrap justify-center gap-2 mt-4">
                <span className="px-3 py-1 rounded-full bg-[#2D6BFF]/20 backdrop-blur-sm text-[#2D6BFF] text-xs font-semibold border border-[#2D6BFF]/30">
                  15+ Years
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0E111A]/60 backdrop-blur-sm text-[#F2F5FA] text-xs font-semibold border border-white/10">
                  Lead AI @ DoodleLabs
                </span>
              </div>
            </div>

            {/* Right: Portrait Card - Smaller size to reduce pixelation */}
            <div
              ref={portraitRef}
              className="hidden lg:block relative"
            >
              <div className="relative w-full max-w-[280px] xl:max-w-[300px] ml-auto aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <img
                  src="/hero_portrait.jpg"
                  alt="Jabbir Basha - Principal AI/Full-Stack Engineer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 image-render-smooth"
                  loading="eager"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080B]/70 via-transparent to-transparent" />
                
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#2D6BFF]/90 backdrop-blur-sm text-[#07080B] text-xs font-semibold">
                    15+ Years Experience
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0E111A]/80 backdrop-blur-sm text-[#F2F5FA] text-xs font-semibold border border-white/10">
                    Lead AI @ DoodleLabs
                  </span>
                </div>

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(45,107,255,0.3) 0%, transparent 50%, rgba(0,217,255,0.3) 100%)',
                    padding: '1px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-8 md:left-[6vw] md:right-[6vw] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div ref={metaRef}>
              <p className="meta-label text-[10px] sm:text-xs text-[#A6AFBF] text-center sm:text-left">
                Singapore · FIPS 140-2 · MASVS L2 · Defense Projects
              </p>
            </div>

            <div ref={ctaRef}>
              <button
                onClick={scrollToWork}
                className="group flex items-center gap-2 text-[#2D6BFF] font-medium hover:gap-3 transition-all text-sm sm:text-base"
              >
                Explore work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
