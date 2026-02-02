import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';
import { AIBackground } from '../components/effects/AIBackground';

gsap.registerPlugin(ScrollTrigger);

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE
      scrollTl.fromTo(contentRef.current,
        { y: '10vh', opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(buttonsRef.current,
        { y: '5vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-5vh', opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className={`section-pinned ${className}`}
    >
      {/* AI Background with CTA image */}
      <AIBackground
        imageSrc="/cta_bg.jpg"
        enableParticles={true}
        enableVideo={true}
        particleColor="#00FF88"
        overlayOpacity={0.7}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 text-center">
        <div ref={contentRef} className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <h2 
            className="text-[clamp(36px,6vw,72px)] font-bold text-[#F2F5FA] leading-[0.95]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Let's build<br />
            <span className="text-gradient">the future</span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-[#A6AFBF] max-w-xl mx-auto">
            Available for select consulting and advisory roles in AI systems, 
            tactical communications, and defense technology.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="mailto:contact@example.com"
              className="group flex items-center gap-3 px-8 py-4 bg-[#2D6BFF] text-[#07080B] rounded-full font-semibold hover:bg-[#4A7FFF] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#2D6BFF]/25"
            >
              <Mail size={20} />
              Start a conversation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 text-[#A6AFBF] hover:text-[#2D6BFF] hover:border-[#2D6BFF]/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 text-[#A6AFBF] hover:text-[#2D6BFF] hover:border-[#2D6BFF]/50 transition-all"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
