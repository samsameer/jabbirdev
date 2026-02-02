import { useRef, useEffect } from 'react';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Simple intersection observer for fade-in on scroll (mobile-friendly)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animateElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    animateElements?.forEach((el) => observer.observe(el as Element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#07080B' }}
    >
      {/* Static background image for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/cta_bg.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ filter: 'brightness(0.25) contrast(1.15)' }}
        />
      </div>
      <div className="absolute inset-0 bg-[#07080B]/60" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center px-4 sm:px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          <h2
            className="animate-on-scroll text-[clamp(32px,5vw,56px)] font-bold text-[#F2F5FA] leading-[0.95] opacity-0 transition-opacity duration-700"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Let's build<br />
            <span className="text-gradient">the future</span>
          </h2>

          <p className="animate-on-scroll text-sm sm:text-base lg:text-lg text-[#F2F5FA] max-w-xl mx-auto opacity-0 transition-opacity duration-700 delay-100">
            Available for select consulting and advisory roles in AI systems,
            tactical communications, and defense technology.
          </p>

          <div className="animate-on-scroll flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 opacity-0 transition-opacity duration-700 delay-200">
            <a
              href="mailto:contact@jabbir.dev"
              className="flex items-center gap-3 px-8 py-4 bg-[#2D6BFF] text-[#07080B] rounded-full font-semibold hover:bg-[#4A7FFF] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#2D6BFF]/25"
            >
              <Mail size={20} />
              Start a conversation
              <ArrowRight size={18} />
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
                href="https://github.com/samsameer"
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
