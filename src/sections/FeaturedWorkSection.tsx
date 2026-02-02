import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedWorkSectionProps {
  className?: string;
}

const FeaturedWorkSection = ({ className = '' }: FeaturedWorkSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth header entrance
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

      // Cards slide in from sides
      gsap.fromTo(leftCardRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(rightCardRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'MeshRider AI Test Platform',
      description: 'Enterprise test automation for DoodleLabs mesh radios. AI-generated test cases using LLM agents, real-time validation with CoT protocol, multi-vendor radio plugins. OpenWRT/LEDE firmware integration.',
      image: '/featured_meshrider.jpg',
      link: '#',
      tech: ['Python', 'LLM Agents', 'OpenWRT', 'CoT Protocol', 'React']
    },
    {
      title: 'DocVector RAG Pipeline',
      description: 'Production RAG system for 100K+ documents. Hybrid search (dense + sparse), re-ranking with Cross-Encoders, source citations, sub-second latency. Deployed on AWS with vector database.',
      image: '/featured_docvector.jpg',
      link: '#',
      tech: ['Python', 'LangChain', 'Pinecone', 'AWS', 'FastAPI']
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="featured-work"
      className={`section-pinned bg-[#07080B] py-20 lg:py-32 ${className}`}
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 sm:mb-16">
          <h2
            className="text-[clamp(28px,5vw,48px)] sm:text-[clamp(32px,4vw,56px)] font-bold text-[#F2F5FA]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Featured work
          </h2>
          <button className="hidden sm:flex items-center gap-2 text-[#A6AFBF] hover:text-[#2D6BFF] transition-colors text-sm sm:text-base">
            View all
            <ArrowRight size={14} className="sm:size-16" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-[1600px] mx-auto">
          {/* Left Card */}
          <div
            ref={leftCardRef}
            className="group relative rounded-xl overflow-hidden card-shadow bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500"
          >
            <div className="relative h-[40%] sm:h-[45%] lg:h-[55%] overflow-hidden">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#F2F5FA] mb-3">
                {projects[0].title}
              </h3>
              <p className="text-[#A6AFBF] text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 line-clamp-2">
                {projects[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[0].tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-[#2D6BFF]/10 text-[#2D6BFF] text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[#2D6BFF] text-sm font-medium hover:gap-3 transition-all">
                Read more
                <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div
            ref={rightCardRef}
            className="group relative rounded-xl overflow-hidden card-shadow bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500"
          >
            <div className="relative h-[40%] sm:h-[45%] lg:h-[55%] overflow-hidden">
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#F2F5FA] mb-3">
                {projects[1].title}
              </h3>
              <p className="text-[#A6AFBF] text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 line-clamp-2">
                {projects[1].description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {projects[1].tech.map((t, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-[#2D6BFF]/10 text-[#2D6BFF] text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>
              <button className="flex items-center gap-2 text-[#2D6BFF] text-sm font-medium hover:gap-3 transition-all">
                Read more
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkSection;
