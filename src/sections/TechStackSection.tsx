import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Cloud, Shield, Smartphone, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TechStackSectionProps {
  className?: string;
}

const TechStackSection = ({ className = '' }: TechStackSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      const cards = gridRef.current?.querySelectorAll('.tech-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: '10vh', opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techCategories = [
    {
      icon: Code2,
      title: 'AI & LLM',
      description: 'Production AI infrastructure',
      tech: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'CrewAI', 'OpenAI', 'Anthropic', 'vLLM', 'LoRA', 'PEFT', 'RAGAS']
    },
    {
      icon: Database,
      title: 'Backend & Data',
      description: 'Scalable services and pipelines',
      tech: ['Node.js', 'FastAPI', 'Django', 'PostgreSQL', 'MongoDB', 'Pinecone', 'Redis', 'RabbitMQ', 'Kafka', 'GraphQL']
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Production infrastructure',
      tech: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'CI/CD', 'Prometheus', 'Grafana']
    },
    {
      icon: Smartphone,
      title: 'Mobile & Frontend',
      description: 'Cross-platform applications',
      tech: ['React', 'React Native', 'Flutter', 'Kotlin', 'Swift', 'TypeScript', 'Tailwind', 'Next.js', 'Vite']
    },
    {
      icon: Radio,
      title: 'Embedded & Mesh',
      description: 'Low-level systems expertise',
      tech: ['OpenWRT/LEDE', 'C/C++', 'Linux Kernel', 'BATMAN-ADV', 'OLSR', 'RF Protocols', 'IoT', 'Embedded Linux']
    },
    {
      icon: Shield,
      title: 'Security & Tactical',
      description: 'Defense-grade systems',
      tech: ['FIPS 140-2', 'MASVS L2', 'OWASP', 'ATAK/TAK', 'CoT Protocol', 'MCPTT', 'DoD Standards', 'Zero Trust']
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className={`section-flowing bg-[#07080B] py-20 lg:py-32 ${className}`}
    >
      <div className="px-4 sm:px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div>
            <h2
              className="text-[clamp(28px,5vw,48px)] sm:text-[clamp(32px,4vw,56px)] font-bold text-[#F2F5FA] mb-3 sm:mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Tech stack
            </h2>
            <p className="text-[#A6AFBF] max-w-md text-base sm:text-lg">
              Full-stack expertise from embedded Linux to LLM inference. Production-ready tools for mission-critical systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#2D6BFF]/10 text-[#2D6BFF] text-xs sm:text-sm font-medium border border-[#2D6BFF]/20">
              50+ Technologies
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0E111A] text-[#A6AFBF] text-xs sm:text-sm font-medium border border-white/5">
              15+ Years Experience
            </span>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="tech-card group"
            >
              <div className="premium-card relative p-5 sm:p-6 rounded-xl bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 h-full">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#2D6BFF]/20 transition-colors">
                  <category.icon size={22} className="sm:size-26 text-[#2D6BFF]" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-[#F2F5FA] mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A6AFBF] mb-3 sm:mb-4">
                  {category.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.tech.map((t, i) => (
                    <span
                      key={i}
                      className="tech-pill px-2 py-1 rounded-md bg-[#07080B]/50 text-[#A6AFBF] text-xs font-mono hover:bg-[#2D6BFF]/10 hover:text-[#2D6BFF] cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>

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

export default TechStackSection;
