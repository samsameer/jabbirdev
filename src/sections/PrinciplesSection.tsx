import { useRef, useEffect } from 'react';
import { GitBranch, Cpu, Eye } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const PrinciplesSection = () => {
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
      className="bg-[#07080B] py-16 sm:py-20 lg:py-32"
    >
      <div className="px-4 sm:px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="animate-on-scroll flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-12 opacity-0 transition-opacity duration-700">
          <h2
            className="text-[clamp(26px,4vw,44px)] font-bold text-[#F2F5FA]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Principles
          </h2>
          <p className="text-[#A6AFBF] max-w-md text-sm">
            I optimize for clarity, reliability, and real-world impact.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="animate-on-scroll group opacity-0 transition-opacity duration-700"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative p-4 sm:p-6 rounded-xl bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 h-full transition-colors">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center mb-4 group-hover:bg-[#2D6BFF]/20 transition-colors">
                  <principle.icon size={22} className="text-[#2D6BFF]" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-[#F2F5FA] mb-2 sm:mb-3">
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
