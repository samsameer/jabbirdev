import { useRef, useEffect } from 'react';
import { Code2, Database, Cloud, Shield, Smartphone, Radio } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const TechStackSection = () => {
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
      className="bg-[#07080B] py-16 sm:py-20 lg:py-32"
    >
      <div className="px-4 sm:px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="animate-on-scroll flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 mb-8 sm:mb-12 opacity-0 transition-opacity duration-700">
          <div>
            <h2
              className="text-[clamp(26px,4vw,44px)] sm:text-[clamp(28px,4vw,48px)] font-bold text-[#F2F5FA] mb-3 sm:mb-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Tech stack
            </h2>
            <p className="text-[#A6AFBF] max-w-md text-sm">
              Full-stack expertise from embedded Linux to LLM inference. Production-ready tools for mission-critical systems.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="animate-on-scroll group opacity-0 transition-opacity duration-700"
              style={{ transitionDelay: `${(index + 1) * 80}ms` }}
            >
              <div className="relative p-4 sm:p-5 rounded-xl bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 h-full transition-colors">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#2D6BFF]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#2D6BFF]/20 transition-colors">
                  <category.icon size={22} className="text-[#2D6BFF]" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-[#F2F5FA] mb-1 sm:mb-2">
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
                      className="px-2 py-1 rounded-md bg-[#07080B]/50 text-[#A6AFBF] text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
