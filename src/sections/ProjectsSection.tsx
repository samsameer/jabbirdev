import { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const ProjectsSection = () => {
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

  const projects = [
    {
      title: 'AI Anti-Jamming System',
      tags: ['Defense', 'RL', 'Embedded', 'RF'],
      description: 'Reinforcement learning (DQN/PPO) for dynamic spectrum management in contested RF environments. 95% jamming resistance, real-time adaptation, OpenWRT integration with custom kernel modules.',
      image: '/project_anti_jam.jpg',
      link: '#',
      tech: ['Python', 'PyTorch', 'OpenWRT', 'C++', 'RLlib']
    },
    {
      title: 'Multi-Agent Coordination',
      tags: ['AI', 'LLM', 'LangGraph', 'CrewAI'],
      description: 'Autonomous LLM agents using LangGraph and CrewAI for resource negotiation and self-healing mesh networks. Agents coordinate without human intervention using shared context and event-driven messaging.',
      image: '/project_multi_agent.jpg',
      link: '#',
      tech: ['LangGraph', 'CrewAI', 'OpenAI', 'Redis', 'FastAPI']
    },
    {
      title: 'Mobile Field Control (ATAK/TAK)',
      tags: ['Android', 'Kotlin', 'ATAK', 'CoT'],
      description: 'Native Android app integrating with ATAK/TAK for blue force tracking, mesh network control, and team coordination. CoT protocol implementation, GPS-denied positioning, MCPTT-compliant PTT.',
      image: '/project_mobile_control.jpg',
      link: '#',
      tech: ['Kotlin', 'ATAK Plugin', 'CoT Protocol', 'Bluetooth', 'WiFi Direct']
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#07080B] py-16 sm:py-20 lg:py-32"
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-[6vw] max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="animate-on-scroll mb-8 sm:mb-12 opacity-0 transition-opacity duration-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
            <h2
              className="text-[clamp(26px,4vw,44px)] sm:text-[clamp(28px,4vw,48px)] font-bold text-[#F2F5FA]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Selected projects
            </h2>
            <p className="text-[#A6AFBF] text-sm max-w-md">
              A few end-to-end builds— from AI pipelines to embedded control interfaces.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="animate-on-scroll group opacity-0 transition-opacity duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-[200px] sm:h-[240px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 rounded-full bg-[#2D6BFF]/10 text-[#2D6BFF] text-[10px] sm:text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#F2F5FA] mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#A6AFBF] text-xs sm:text-sm mb-3 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-[#2D6BFF]/10 text-[#2D6BFF] text-[10px] sm:text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <button className="flex items-center gap-2 text-[#2D6BFF] text-sm font-medium hover:gap-3 transition-all">
                    Read case study
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
