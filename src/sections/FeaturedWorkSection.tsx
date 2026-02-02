import { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

// No GSAP/ScrollTrigger - better mobile performance

const FeaturedWorkSection = () => {
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
      className="bg-[#07080B] py-16 sm:py-20 lg:py-32"
    >
      <div className="relative w-full px-4 sm:px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="animate-on-scroll flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12 opacity-0 transition-opacity duration-700">
          <h2
            className="text-[clamp(26px,4vw,44px)] sm:text-[clamp(28px,4vw,48px)] font-bold text-[#F2F5FA]"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Featured work
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-[1600px] mx-auto">
          {/* Card 1 */}
          <div className="animate-on-scroll group relative rounded-xl overflow-hidden card-shadow bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500 opacity-0 transition-opacity duration-700 delay-100">
            <div className="relative h-[200px] sm:h-[240px] lg:h-[280px] overflow-hidden">
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#F2F5FA] mb-2 sm:mb-3">
                {projects[0].title}
              </h3>
              <p className="text-[#A6AFBF] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
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

          {/* Card 2 */}
          <div className="animate-on-scroll group relative rounded-xl overflow-hidden card-shadow bg-[#0E111A] border border-white/5 hover:border-[#2D6BFF]/30 transition-all duration-500 opacity-0 transition-opacity duration-700 delay-200">
            <div className="relative h-[200px] sm:h-[240px] lg:h-[280px] overflow-hidden">
              <img
                src={projects[1].image}
                alt={projects[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E111A] to-transparent" />
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-[#F2F5FA] mb-2 sm:mb-3">
                {projects[1].title}
              </h3>
              <p className="text-[#A6AFBF] text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
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
