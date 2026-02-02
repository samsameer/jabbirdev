import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterSectionProps {
  className?: string;
}

const FooterSection = ({ className = '' }: FooterSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'Work', id: 'featured-work' },
    { label: 'Notes', id: 'technical-notes' },
    { label: 'Stack', id: 'tech-stack' },
    { label: 'Contact', id: 'cta' },
  ];

  return (
    <footer 
      ref={sectionRef}
      className={`section-flowing bg-[#0E111A] py-12 lg:py-16 ${className}`}
    >
      <div ref={contentRef} className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Left: Copyright */}
          <div className="text-[#A6AFBF] text-sm">
            © 2026 jabbir.dev
          </div>

          {/* Center: Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-[#A6AFBF] hover:text-[#F2F5FA] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Heart icon */}
          <div className="flex items-center gap-2 text-[#A6AFBF] text-xs">
            <Heart size={12} className="text-[#2D6BFF] fill-[#2D6BFF]" />
          </div>
        </div>

        {/* Bottom: Tagline */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="meta-label text-[10px]">
            Building intelligent systems for the real world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
