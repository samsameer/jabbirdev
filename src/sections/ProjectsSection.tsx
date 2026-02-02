import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  className?: string;
}

const ProjectsSection = ({ className = '' }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards stagger in
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
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
      className={`section-pinned bg-[#07080B] py-20 lg:py-32 ${className}`}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-[6vw] max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
            <h2
              className="text-[clamp(28px,5vw,48px)] sm:text-[clamp(32px,4vw,56px)] font-bold text-[#F2F5FA]"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Selected projects
            </h2>
            <p className="text-[#A6AFBF] text-sm sm:text-base max-w-md">
              A few end-to-end builds— from AI pipelines to embedded control interfaces.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-[#2D6BFF]/10 text-[#2D6BFF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#F2F5FA] mb-2 sm:mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#A6AFBF] text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3">
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
