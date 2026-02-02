import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitBranch, Cpu, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PrinciplesSectionProps {
  className?: string;
}

const PrinciplesSection = ({ className = '' }: PrinciplesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.principle-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      icon: GitBranch,
      title: 'Full-stack systems architecture',
      description: 'From embedded Linux kernels to LLM inference pipelines. I design systems spanning OpenWRT firmware, Android ATAK plugins, React dashboards, and Python AI services—all working together.'
    },
    {
      icon: Cpu,
      title: 'Production AI infrastructure',
      description: 'LLM systems built for reliability: vLLM inference, RAGAS validation, LangGraph agents, monitoring with Weights & Biases, and graceful degradation when models fail.'
    },
    {
      icon: Eye,
      title: 'Security & compliance first',
      description: 'FIPS 140-2 cryptographic modules, MASVS L2 mobile security, DoD contract requirements. Every system designed with zero-trust principles and audit trails.'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="principles"
      className={`section-flowing bg-[#07080B] py-20 lg:py-32 ${className}`}
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <h2 
            className="text-[clamp(32px,4vw,56px)] font-bold text-[#F2F5FA]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Principles
          </h2>
          <p className="text-[#A6AFBF] max-w-md text-lg">
            I optimize for clarity, reliability, and real-world impact.
          </p>
        </div>

        {/* Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {principles.map((principle, index) => (
            <div 
              key={index}
              className="principle-card group"
            >
              <div className="premium-card relative p-5 sm:p-6 lg:p-8 rounded-xl bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 h-full">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#2D6BFF]/20 transition-colors">
                  <principle.icon size={22} className="sm:size-26 text-[#2D6BFF]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#F2F5FA] mb-3 sm:mb-4">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-[#A6AFBF] text-sm sm:text-base leading-relaxed">
                  {principle.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2D6BFF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
